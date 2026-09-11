const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { saveEnquiry, getAllEnquiries } = require('./db');
const { sendEnquiryEmail } = require('./email');

const { GEMINI_API_KEY, PORT } = process.env;
const isKeyConfigured = GEMINI_API_KEY && !GEMINI_API_KEY.includes('your_');
let model = null;

const toolDefinition = {
  functionDeclarations: [
    {
      name: "save_enquiry",
      description: "Saves a visitor's contact information and enquiry message to the database.",
      parameters: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING", description: "Visitor's full name" },
          email: { type: "STRING", description: "Visitor's email address" },
          phone: { type: "STRING", description: "Visitor's phone number" },
          message: { type: "STRING", description: "Visitor's project requirement or message" }
        },
        required: ["name", "email", "phone", "message"]
      }
    }
  ]
};

if (!isKeyConfigured) {
  console.warn('⚠️ GEMINI_API_KEY is not set or using placeholder in server/.env.');
  console.warn('Backend server will run, but live AI chat responses will prompt to configure the API key.');
} else {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      tools: [toolDefinition]
    });
  } catch (err) {
    console.error('Error initializing Gemini model:', err.message);
  }
}

// Read firm context so the AI knows about Sharada
const contextPath = path.join(__dirname, '../frontend/src/app/data/siteContent.ts');
let firmContext = "";
try {
  firmContext = fs.readFileSync(contextPath, 'utf8');
} catch (e) {
  firmContext = "Sharada Production & Media Mgmt. Locations: Nanded, Pune, Hyderabad.";
}

const SYSTEM_INSTRUCTION = `
You are the Sharada Copilot, a helpful AI assistant for Sharada Production & Media Mgmt.
Keep your answers brief, warm, and highly relevant to the firm's services (film promotion, music launch, web/app development, AI, branding).
Do NOT format with markdown (no bold/italics), just use plain text. Do not invent pricing or promises.

When the visitor shows genuine interest in contacting the company, you MUST ask for their Name, Email, Phone Number, and Requirement/Message. Once you have collected all four pieces of information, call the 'save_enquiry' function to save their details and then let them know our team will contact them shortly.

Here is the firm context:
${firmContext}
`.replace(/\n/g, ' ').trim();

const app = express();

// Configure CORS and JSON parsing for the Lead API
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://127.0.0.1:5173']
  : '*';
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

async function getAiScore({ name, email, phone, message, source }) {
  try {
    const aiEngineUrl = (process.env.AI_ENGINE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
    const response = await fetch(`${aiEngineUrl}/score-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        source: source || 'contact_form',
        name: name || '',
        email: email || '',
        phone: phone || ''
      })
    });
    if (response.ok) {
      const data = await response.json();
      return data.ai_score;
    }
  } catch (e) {
    console.warn("AI Engine not reachable, defaulting score to 0.");
  }
  return 0;
}

// --- Lead API Endpoint ---
app.post('/api/enquiries', async (req, res) => {
  const { name, email, phone, message, source } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  try {
    const ai_score = await getAiScore({ name, email, phone, message, source });

    const enquiry = {
      name,
      email,
      phone,
      message,
      source: source || 'contact_form',
      conversation: null,
      ai_score
    };

    saveEnquiry(enquiry);
    await sendEnquiryEmail(enquiry);
    
    return res.json({ success: true, message: 'Enquiry saved successfully.', ai_score });
  } catch (err) {
    console.error('Failed to save enquiry:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// --- Get All Enquiries Endpoint ---
app.get('/api/enquiries', (req, res) => {
  try {
    const enquiries = getAllEnquiries();
    return res.json({ success: true, count: enquiries.length, enquiries });
  } catch (err) {
    console.error('Failed to fetch enquiries:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch enquiries' });
  }
});


const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });

// We'll map ws to a ChatSession object from @google/generative-ai
const sessions = new Map();

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => (ws.isAlive = true));

  // Initialize chat session if model is available
  if (model) {
    try {
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text: "System instruction: " + SYSTEM_INSTRUCTION }] },
          { role: "model", parts: [{ text: "Understood. I am Sharada Copilot." }] }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 250,
        }
      });
      sessions.set(ws, chat);
    } catch (e) {
      console.error('Failed to create chat session:', e.message);
    }
  }

  ws.on('message', async (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch (e) { return; }

    if (msg.type === 'ping') return ws.send(JSON.stringify({ type: 'pong' }));

    if (msg.type === 'user_message') {
      const userText = String(msg.text || '').trim();
      if (!userText) return;

      const chatSession = sessions.get(ws);

      if (!chatSession) {
        ws.send(JSON.stringify({ type: 'start', info: 'streaming_started' }));
        ws.send(JSON.stringify({ 
          type: 'chunk', 
          chunk: "The backend server is active, but GEMINI_API_KEY is not configured yet in server/.env. Please add your Google Gemini API key to server/.env to enable live AI responses." 
        }));
        ws.send(JSON.stringify({ type: 'end' }));
        return;
      }

      try {
        ws.send(JSON.stringify({ type: 'start', info: 'streaming_started' }));
        
        let result = await chatSession.sendMessageStream(userText);
        
        // Handle tool calls during streaming
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
             ws.send(JSON.stringify({ type: 'chunk', chunk: chunkText }));
          }
          
          const functionCalls = chunk.functionCalls();
          if (functionCalls && functionCalls.length > 0) {
            for (const call of functionCalls) {
              if (call.name === "save_enquiry") {
                const args = call.args;
                
                // Get chat history for saving
                let conversationText = "";
                try {
                   const hist = await chatSession.getHistory();
                   conversationText = JSON.stringify(hist.map(m => ({role: m.role, text: m.parts[0]?.text || ''})));
                } catch(e) {}
                
                const ai_score = await getAiScore({
                  name: args.name,
                  email: args.email,
                  phone: args.phone,
                  message: args.message,
                  source: 'chatbot'
                });
                
                const enquiry = {
                  name: args.name,
                  email: args.email,
                  phone: args.phone,
                  message: args.message,
                  source: 'chatbot',
                  conversation: conversationText,
                  ai_score
                };
                
                saveEnquiry(enquiry);
                await sendEnquiryEmail(enquiry);
                
                // Send response back to model so it can formulate final output
                result = await chatSession.sendMessageStream([{
                  functionResponse: {
                    name: "save_enquiry",
                    response: { success: true }
                  }
                }]);
                
                for await (const nextChunk of result.stream) {
                  const nextText = nextChunk.text();
                  if (nextText) ws.send(JSON.stringify({ type: 'chunk', chunk: nextText }));
                }
              }
            }
          }
        }

        ws.send(JSON.stringify({ type: 'end' }));
      } catch (err) {
        console.error("Gemini Error:", err);
        ws.send(JSON.stringify({ type: 'error', error: 'Failed to connect to AI' }));
      }
    }
  });

  ws.on('close', () => {
    sessions.delete(ws);
  });
});

const interval = setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.isAlive === false) return client.terminate();
    client.isAlive = false;
    client.ping();
  });
}, 30000);

const listenPort = PORT || 8080;
server.listen(listenPort, () => console.log(`Sharada proxy streaming on port ${listenPort}`));
