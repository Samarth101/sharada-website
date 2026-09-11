# Sharada Production & Media Mgmt.

A modern creative media, marketing, and technology platform featuring an AI Copilot chatbot, enquiry management, and an intelligent lead scoring engine.

## Clean Project Structure

```
sharada-website-main/
├── frontend/               # React + Vite + Tailwind CSS web application
│   ├── src/
│   │   ├── app/           # Pages, components, hooks, and site content
│   │   ├── styles/        # Theme and CSS styles
│   │   └── imports/       # Images and brand assets
│   ├── package.json
│   └── vite.config.ts
├── backend/                # Node.js + Express + WebSocket backend
│   ├── index.js           # Server entry point & Gemini Copilot proxy
│   ├── db.js              # SQLite database (enquiries table)
│   ├── email.js           # Nodemailer notification service
│   ├── test-client.js     # WebSocket test script
│   ├── package.json
│   └── .env.example
├── ai-engine/              # Python FastAPI microservice for AI/ML
│   ├── main.py            # Lead scoring inference API (POST /score-lead)
│   ├── train.py           # Model training script
│   ├── model.pkl          # Trained Random Forest pipeline
│   └── requirements.txt   # Python dependencies
├── .gitignore             # Comprehensive Git ignore for Node, Python, SQLite
├── README.md              # Project documentation
└── pnpm-workspace.yaml    # Workspace package manager config
```

---

## Prerequisites

- **Node.js**: v18+ (tested on Node 18 & 20)
- **Python**: 3.10+ (for `ai-engine`)
- **npm** or **pnpm**
- **Google Gemini API Key** (from Google AI Studio)

---

## Quick Setup & Installation

### 1. Backend (`backend/`)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and configure GEMINI_API_KEY, PORT=8080, and optional email settings
```

### 2. Frontend (`frontend/`)
```bash
cd frontend
npm install
```

### 3. AI Engine (`ai-engine/`)
```bash
cd ai-engine
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 train.py
```

---

## Running the Application

To run the complete ecosystem locally, start the three services in separate terminal windows:

### Terminal 1 — Backend API & Copilot WebSocket
```bash
cd backend
npm start
# Runs on http://localhost:8080 (WebSocket at ws://localhost:8080/ws)
```

### Terminal 2 — Frontend Application
```bash
cd frontend
npm run dev
# Opens on http://localhost:5173
```

### Terminal 3 — AI Lead Scoring Microservice
```bash
cd ai-engine
source .venv/bin/activate
uvicorn main:app --reload --port 8000
# Runs on http://localhost:8000
```

---

## Features

- **AI Copilot (Gemini 2.5 Flash)**: Real-time streamed interactive chatbot providing information about Sharada's services.
- **Automated Lead Collection**: Collects visitor enquiries through both the interactive Copilot chat and the Contact Form.
- **Intelligent Lead Scoring (AI/ML)**: Automatically calculates a 1–100 probability score for each enquiry based on intent, project scope, and urgency.
- **Email Notifications**: Instant alert emails dispatched to the team upon new enquiries.
- **Local Storage**: Reliable SQLite storage in `enquiries.db` with status tracking.