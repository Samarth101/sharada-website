import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import OneHotEncoder

def generate_synthetic_data(n=2000):
    np.random.seed(42)
    
    # 1. Keywords
    good_keywords = [
        "film", "music", "artist", "promote", "promotion", "launch", "campaign",
        "website", "app", "development", "brand", "branding", "budget", "pricing",
        "quote", "timeline", "urgent", "hire", "proposal", "cost", "schedule", "meeting"
    ]
    casual_words = ["need", "want", "looking", "require", "help", "project", "work", "business", "services", "team"]
    
    bad_keywords = ["hi", "hello", "hey", "test", "testing", "asdf", "qwerty", "free", "cheap", "job", "internship", "vacancy", "salary"]
    gibberish_examples = [
        "asdaDNJKWAJENDA", "asdfasdf", "qwertyuiop", "zxcvbnm", "ajkdsfhkjsaf",
        "123456", "test test test", "aaaaaaa", "bbbbbb", "xyz123"
    ]
    
    data = []
    for _ in range(n):
        # 4 categories: High Intent (35%), General Inquiry (25%), Low Intent/Casual (25%), Spam/Gibberish (15%)
        category = np.random.choice(["high_intent", "general", "low_intent", "spam"], p=[0.35, 0.25, 0.25, 0.15])
        
        if category == "high_intent":
            length = np.random.randint(12, 35)
            words = list(np.random.choice(good_keywords, size=np.random.randint(2, 5))) + \
                    list(np.random.choice(casual_words, size=np.random.randint(2, 4))) + \
                    ["details"] * (length - 6)
            message = " ".join(words)
            source = np.random.choice(["contact_form", "chatbot"], p=[0.6, 0.4])
            converted = 1
            
        elif category == "general":
            length = np.random.randint(6, 15)
            words = list(np.random.choice(good_keywords, size=1)) + \
                    list(np.random.choice(casual_words, size=np.random.randint(1, 3))) + \
                    ["information"] * (length - 3)
            message = " ".join(words)
            source = np.random.choice(["contact_form", "chatbot"], p=[0.5, 0.5])
            converted = np.random.choice([1, 0], p=[0.45, 0.55])
            
        elif category == "low_intent":
            words = list(np.random.choice(bad_keywords, size=np.random.randint(1, 3)))
            message = " ".join(words)
            source = np.random.choice(["contact_form", "chatbot"], p=[0.3, 0.7])
            converted = 0
            
        else: # Spam / Gibberish
            message = np.random.choice(gibberish_examples)
            source = np.random.choice(["contact_form", "chatbot"], p=[0.5, 0.5])
            converted = 0
            
        data.append({
            "message": message,
            "source": source,
            "converted": converted
        })
        
    return pd.DataFrame(data)

def train_model():
    print("Generating comprehensive synthetic dataset (2000 samples)...")
    df = generate_synthetic_data(2000)
    
    X = df[['message', 'source']]
    y = df['converted']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('text', TfidfVectorizer(max_features=250, stop_words='english', ngram_range=(1, 2)), 'message'),
            ('cat', OneHotEncoder(handle_unknown='ignore'), ['source'])
        ])
        
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=120, max_depth=10, random_state=42))
    ])
    
    print("Training robust Random Forest model...")
    model.fit(X, y)
    
    print("Saving model to model.pkl...")
    joblib.dump(model, 'model.pkl')
    print("Model trained and saved successfully!")

if __name__ == "__main__":
    train_model()
