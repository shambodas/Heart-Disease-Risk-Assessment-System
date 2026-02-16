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
import os
from flask_cors import CORS


# =======================
# 1. CREATE FLASK APP
# =======================

app = Flask(__name__)
CORS(app) # Enable CORS for all routes


# =======================
# 2. LOAD TRAINED ARTIFACTS
# =======================

# Determine the directory of the current script to load artifacts correctly
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load trained ML model
model = joblib.load(os.path.join(BASE_DIR, "final_heart_model.pkl"))

# Load scaler used during training
scaler = joblib.load(os.path.join(BASE_DIR, "scaler.pkl"))

# Load tuned decision threshold
threshold = joblib.load(os.path.join(BASE_DIR, "decision_threshold.pkl"))

# Load saved feature column order (VERY IMPORTANT for correct prediction)
feature_columns = joblib.load(os.path.join(BASE_DIR, "feature_columns.pkl"))


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

    # 1. ENSURE NUMERIC COLUMNS ARE CORRECT TYPES
    # This is critical because frontend might send numbers as strings
    numeric_cols = ['BMI', 'PhysicalHealth', 'MentalHealth', 'SleepTime']
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    # 2. Apply one‑hot encoding (same as training)
    df = pd.get_dummies(df)

    # 3. Add any missing columns that existed during training
    # This handles categories not present in current input
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0

    # 4. Ensure exact same column order as training
    df = df[feature_columns]

    # Return as NumPy array for model input
    return df.values


# =======================
# 5. PREDICTION ROUTE
# =======================

@app.route("/predict", methods=["POST"])
def predict():
    """
    Expected JSON input (RAW HUMAN DATA)
    """
    try:
        # Receive JSON body from request
        raw_json = request.get_json()
        
        if not raw_json:
            return jsonify({"error": "No input data provided"}), 400

        # Convert raw input → processed numeric features
        processed_features = preprocess_input(raw_json)

        # Apply SAME scaler used in training
        processed_features_scaled = scaler.transform(processed_features)

        # Predict probability of heart disease
        # model.predict_proba returns [[prob_no, prob_yes]]
        prob = model.predict_proba(processed_features_scaled)[0][1]

        # Apply tuned medical decision threshold
        prediction = int(prob >= threshold)

        # Return structured JSON response
        return jsonify({
            "prediction": prediction,
            "probability": float(prob),
            "threshold": float(threshold),
            "status": "success"
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500


# =======================
# 6. RUN FLASK SERVER
# =======================

if __name__ == "__main__":
    app.run(debug=True)
