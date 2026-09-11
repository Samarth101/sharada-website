from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import joblib
import pandas as pd
import os
from scorer import evaluate_lead

app = FastAPI(title="Sharada AI Lead Scoring Engine")

class LeadRequest(BaseModel):
    message: str
    source: str = "contact_form"
    name: Optional[str] = ""
    email: Optional[str] = ""
    phone: Optional[str] = ""

model = None

@app.on_event("startup")
def load_model():
    global model
    model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        print("ML Pipeline model loaded successfully.")
    else:
        print("WARNING: model.pkl not found. Running with rule-based evaluator.")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Sharada AI Lead Scoring Engine (v2.0 Robust)",
        "features": ["Spam Detection", "Gibberish Filtering", "Domain Intent Analysis", "Contact Verification"],
        "endpoints": {
            "docs": "/docs",
            "score_lead": "POST /score-lead"
        }
    }

@app.post("/score-lead")
def score_lead(lead: LeadRequest):
    # 1. First, run the robust NLP & Spam/Gibberish verification
    evaluation = evaluate_lead(
        message=lead.message,
        source=lead.source,
        name=lead.name or "",
        email=lead.email or "",
        phone=lead.phone or ""
    )
    
    # If the message is spam, keyboard mash, or empty -> Immediate low score
    if not evaluation.get("is_valid", True):
        return {
            "ai_score": evaluation["ai_score"],
            "intent_level": evaluation["intent_level"],
            "reason": evaluation["reason"],
            "status": "success"
        }

    # 2. If valid, compute ML probability from the trained Random Forest model
    heuristic_score = evaluation["ai_score"]
    ml_score = heuristic_score # default if model not loaded

    if model is not None:
        try:
            df = pd.DataFrame([{
                "message": lead.message,
                "source": lead.source
            }])
            probabilities = model.predict_proba(df)
            ml_score = int(round(probabilities[0][1] * 100))
        except Exception as e:
            print(f"ML inference error: {e}")
            ml_score = heuristic_score

    # 3. Ensemble score (70% rule-based NLP domain logic, 30% statistical ML model)
    final_score = int(round(0.7 * heuristic_score + 0.3 * ml_score))
    final_score = max(5, min(99, final_score))

    return {
        "ai_score": final_score,
        "intent_level": evaluation["intent_level"],
        "reason": evaluation["reason"],
        "status": "success"
    }
