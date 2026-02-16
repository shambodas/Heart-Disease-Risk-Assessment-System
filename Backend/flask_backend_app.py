# ============================================================
# FLASK BACKEND FOR HEART DISEASE PREDICTION (FINAL FIXED VERSION)
# ============================================================
# This backend now correctly:
# - Accepts simple 17 human‑readable inputs from frontend
# - Applies SAME preprocessing as training (get_dummies + column order)
# - Uses saved scaler and ML model
# - Applies tuned medical decision threshold
# - Returns clean JSON prediction response
# ============================================================

from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import joblib


# =======================
# 1. CREATE FLASK APP
# =======================

app = Flask(__name__)


# =======================
# 2. LOAD TRAINED ARTIFACTS
# =======================

# Load trained ML model
model = joblib.load("final_heart_model.pkl")

# Load scaler used during training
scaler = joblib.load("scaler.pkl")

# Load tuned decision threshold
threshold = joblib.load("decision_threshold.pkl")

# Load saved feature column order (VERY IMPORTANT for correct prediction)
feature_columns = joblib.load("feature_columns.pkl")


# =======================
# 3. HOME ROUTE (BASIC TEST)
# =======================

@app.route("/")
def home():
    return "Heart Disease Prediction API is running ✔"


# =======================
# 4. PREPROCESSING FUNCTION
# =======================


def preprocess_input(raw_data: dict):
    """
    Converts raw patient JSON → encoded numeric feature array
    using SAME preprocessing as training time.
    """

    # Convert dictionary → pandas DataFrame (single row)
    df = pd.DataFrame([raw_data])

    # Apply one‑hot encoding (same as training)
    df = pd.get_dummies(df)

    # Add any missing columns that existed during training
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0

    # Ensure exact same column order as training
    df = df[feature_columns]

    # Return as NumPy array for model input
    return df.values


# =======================
# 5. PREDICTION ROUTE
# =======================

@app.route("/predict", methods=["POST"])
def predict():
    """
    Expected JSON input (RAW HUMAN DATA):

    {
        "BMI": 25,
        "Smoking": "Yes",
        "AlcoholDrinking": "No",
        "Stroke": "No",
        "PhysicalHealth": 5,
        "MentalHealth": 2,
        "DiffWalking": "No",
        "Sex": "Male",
        "AgeCategory": "25-29",
        "Race": "White",
        "Diabetic": "No",
        "PhysicalActivity": "Yes",
        "GenHealth": "Good",
        "SleepTime": 7,
        "Asthma": "No",
        "KidneyDisease": "No",
        "SkinCancer": "No"
    }
    """

    # Receive JSON body from request
    raw_json = request.get_json()

    # Convert raw input → processed numeric features
    processed_features = preprocess_input(raw_json)

    # Apply SAME scaler used in training
    processed_features_scaled = scaler.transform(processed_features)

    # Predict probability of heart disease
    prob = model.predict_proba(processed_features_scaled)[0][1]

    # Apply tuned medical decision threshold
    prediction = int(prob >= threshold)

    # Return structured JSON response
    return jsonify({
        "prediction": prediction,
        "probability": float(prob),
        "threshold": float(threshold)
    })


# =======================
# 6. RUN FLASK SERVER
# =======================

if __name__ == "__main__":
    app.run(debug=True)
