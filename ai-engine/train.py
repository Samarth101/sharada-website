import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import OneHotEncoder

def generate_synthetic_data(n=1000):
    np.random.seed(42)
    
    # 1. Generate text messages
    good_keywords = ["budget", "urgent", "timeline", "project", "hire", "proposal", "cost", "scale", "launch", "campaign"]
    bad_keywords = ["hi", "hello", "free", "cheap", "job", "internship", "test", "spam"]
    
    data = []
    for _ in range(n):
        # Determine base intent
        intent = np.random.choice(["high_intent", "low_intent"], p=[0.3, 0.7])
        
        if intent == "high_intent":
            # Longer messages with good keywords
            length = int(np.random.normal(50, 20))
            words = list(np.random.choice(good_keywords, size=np.random.randint(1, 4))) + ["text"] * max(1, length)
            message = " ".join(words)
            source = np.random.choice(["contact_form", "chatbot"], p=[0.7, 0.3])
            converted = np.random.choice([1, 0], p=[0.8, 0.2])  # 80% convert
        else:
            # Shorter messages with bad keywords
            length = int(np.random.normal(10, 5))
            words = list(np.random.choice(bad_keywords, size=np.random.randint(0, 2))) + ["text"] * max(1, length)
            message = " ".join(words)
            source = np.random.choice(["contact_form", "chatbot"], p=[0.4, 0.6])
            converted = np.random.choice([1, 0], p=[0.05, 0.95]) # 5% convert
            
        data.append({
            "message": message,
            "source": source,
            "converted": converted
        })
        
    return pd.DataFrame(data)

def train_model():
    print("Generating synthetic data...")
    df = generate_synthetic_data(1000)
    
    X = df[['message', 'source']]
    y = df['converted']
    
    # Define preprocessing steps
    preprocessor = ColumnTransformer(
        transformers=[
            ('text', TfidfVectorizer(max_features=100, stop_words='english'), 'message'),
            ('cat', OneHotEncoder(handle_unknown='ignore'), ['source'])
        ])
        
    # Create pipeline
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
    ])
    
    # Train
    print("Training Random Forest model...")
    model.fit(X, y)
    
    # Save model
    print("Saving model to model.pkl...")
    joblib.dump(model, 'model.pkl')
    print("Done!")

if __name__ == "__main__":
    train_model()
