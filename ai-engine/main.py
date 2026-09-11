from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI(title="Sharada AI Engine")

# Define request schema
class Lead(BaseModel):
    message: str
    source: str = "contact_form"

# Load model globally
model = None

@app.on_event("startup")
def load_model():
    global model
    model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        print("Model loaded successfully.")
    else:
        print("WARNING: model.pkl not found. Please run train.py first.")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Sharada AI Lead Scoring Engine",
        "endpoints": {
            "docs": "/docs",
            "score_lead": "POST /score-lead"
        }
    }

@app.post("/score-lead")
def score_lead(lead: Lead):
    global model
    if model is None:
        raise HTTPException(status_code=503, detail="Model is not loaded.")
    
    # Create DataFrame from input
    df = pd.DataFrame([{
        "message": lead.message,
        "source": lead.source
    }])
    
    # Get probability of class 1 (converted)
    probabilities = model.predict_proba(df)
    score = probabilities[0][1] * 100 # Convert to 0-100 scale
    
    return {
        "ai_score": int(round(score)),
        "status": "success"
    }
