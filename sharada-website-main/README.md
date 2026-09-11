# Sharada Production & Media Mgmt.

The repository is structured as a monorepo with separate `client` and `server` environments.

## Project Structure

- `/client`: Frontend built with React, Vite, and Tailwind CSS.
- `/server`: Node.js + Express backend that handles WebSocket streaming for the Gemini AI Copilot.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm** (Workspace is configured for pnpm, but npm works as well)
- **Gemini API Key**: You need an active API key from Google AI Studio.

## Setup & Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Setup the Backend (Server)

Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create an environment file:
1. In the `server` directory, create a new file named `.env`.
2. Add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=8080
   ```

### 3. Setup the Frontend (Client)

Open a new terminal tab, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```

## Running the Application

To run the application locally, you need to start both the server and the client simultaneously.

### Start the Backend
In your first terminal, from the `server` directory:
```bash
npm start
```
The server will start listening for WebSocket connections on `ws://localhost:8080/ws`.

### Start the Frontend
In your second terminal, from the `client` directory:
```bash
npm run dev
```
This will launch the Vite development server. Open the provided `http://localhost:5173` link in your browser to view the website.

## Chatbot (Sharada Copilot)
The website features an AI Copilot in the bottom right corner.
When you send a message, the React client connects to the Node.js backend via WebSockets. The backend securely uses your `GEMINI_API_KEY` to stream responses using the `@google/generative-ai` SDK (`gemini-2.5-flash` model), sending real-time chunks back to the UI.