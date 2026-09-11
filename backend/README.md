Sharada Copilot WebSocket proxy

1. Copy .env.example to .env and set GEMINI_API_KEY and GEMINI_ENDPOINT.
2. Install dependencies:
   npm install
3. Start the proxy:
   npm start

The proxy exposes a WebSocket at ws://HOST:PORT/ws which accepts JSON messages:
- { type: 'user_message', text: '...' }

And streams back tokens/chunks as JSON messages:
- { type: 'start' }
- { type: 'chunk', chunk: '...' }
- { type: 'end' }
- { type: 'error', error: '...' }

Adjust the GEMINI request body in index.js to match the official Gemini streaming API schema.
