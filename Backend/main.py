# ============================================================
# HEART DISEASE PREDICTION — FULLY COMMENTED RECRUITER‑READY SCRIPT
# ============================================================
# This file is written so that EVEN A BEGINNER can reopen it later
# and understand what EVERY line of code is doing.
#
# Project goals:
# - Use a large real healthcare dataset
# - Compare multiple ML models
# - Focus on Recall + ROC‑AUC (important in medical ML)
# - Select the best model automatically
# - Save a deployable model for backend/website
# ============================================================


# =======================
# 1. IMPORT LIBRARIES
# =======================

import numpy as np              # Provides fast numerical operations (arrays, math, etc.)
import pandas as pd             # Used to load and manipulate CSV/tabular data
import matplotlib.pyplot as plt # Used to draw graphs and plots
import seaborn as sns           # Advanced plotting library built on matplotlib

from sklearn.model_selection import train_test_split  # Splits dataset into training and testing sets
from sklearn.preprocessing import StandardScaler      # Scales numeric features to similar ranges

from sklearn.linear_model import LogisticRegression   # Linear classification model
from sklearn.tree import DecisionTreeClassifier       # Tree‑based classification model
from sklearn.ensemble import RandomForestClassifier   # Ensemble of many decision trees
from xgboost import XGBClassifier                     # Powerful gradient boosting model (industry standard)

from sklearn.metrics import (                         # Metrics used to evaluate ML performance
    accuracy_score,                                   # Overall correctness of predictions
    precision_score,                                  # Of predicted sick patients, how many are truly sick
    recall_score,                                     # Of real sick patients, how many we detected (MOST IMPORTANT in healthcare)
    f1_score,                                         # Balance between precision and recall
    roc_auc_score,                                    # Probability‑based performance metric
    confusion_matrix,                                 # Table showing correct vs incorrect predictions
    roc_curve,                                        # Used to compute ROC curve points
)

import joblib  # Saves trained ML models to disk for later use in backend or website


# =======================
# 2. LOAD DATASET
# =======================

# Read CSV file named "heart.csv" into memory as a pandas DataFrame
# IMPORTANT: heart.csv must be in the SAME folder as this Python file

df = pd.read_csv("heart.csv")


# =======================
# 3. BASIC DATA INSPECTION
# =======================

print("\n========== FIRST 5 ROWS ==========")  # Heading text for clarity in terminal
print(df.head())                                # Shows first 5 rows to understand structure

print("\n========== DATASET INFO ==========")
print(df.info())                                # Shows column names, data types, and missing values

print("\n========== STATISTICS ==========")
print(df.describe())                            # Shows mean, min, max, etc. for numeric columns


# =======================
# 4. TARGET COLUMN PROCESSING
# =======================

# Convert Yes/No labels into numeric values required by ML models
# Yes (disease present) → 1
# No  (disease absent)  → 0

df["HeartDisease"] = df["HeartDisease"].map({"Yes": 1, "No": 0})


# =======================
# 5. SPLIT FEATURES AND TARGET
# =======================

# X contains ALL input features except the target column
# y contains ONLY the target column we want to predict

X = df.drop("HeartDisease", axis=1)
y = df["HeartDisease"]


# =======================
# 6. ENCODE CATEGORICAL TEXT INTO NUMBERS
# =======================

# Machine learning models cannot read text like "Male", "Yes", etc.
# get_dummies converts categories into numeric 0/1 columns
# drop_first=True prevents duplicate information (avoids multicollinearity)

X = pd.get_dummies(X, drop_first=True)
# Save final feature column order for deployment
joblib.dump(X.columns.tolist(), "feature_columns.pkl")



# =======================
# 7. TRAIN‑TEST SPLIT
# =======================

# 80% of data is used to TRAIN the model
# 20% is kept unseen for TESTING real‑world performance

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


# =======================
# 8. FEATURE SCALING (USED BY LOGISTIC REGRESSION)
# =======================

# Scaling ensures all numeric features are on similar ranges
# Important for distance‑based or linear models

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)  # Learn scaling from training data
X_test_scaled = scaler.transform(X_test)        # Apply SAME scaling to test data


# =======================
# 9. HANDLE CLASS IMBALANCE (IMPORTANT STEP)
# =======================

# Count how many negative vs positive samples exist in training data
negative = (y_train == 0).sum()
positive = (y_train == 1).sum()

# Ratio used by XGBoost to balance importance of minority class
scale_pos_weight = negative / positive

print("\nClass imbalance ratio:", scale_pos_weight)


# =======================
# 10. DEFINE MULTIPLE MODELS FOR COMPARISON
# =======================

models = {

    # Logistic Regression with class balancing
    "Logistic Regression": LogisticRegression(max_iter=1000, class_weight="balanced"),

    # Decision Tree with limited depth to avoid overfitting
    "Decision Tree": DecisionTreeClassifier(class_weight="balanced", max_depth=10),

    # Random Forest with multiple trees and CPU parallelism
    "Random Forest": RandomForestClassifier(
        n_estimators=120, max_depth=12, class_weight="balanced", n_jobs=-1, random_state=42
    ),

    # Tuned XGBoost model with imbalance handling
    "XGBoost": XGBClassifier(
        n_estimators=250,            # Number of boosting trees
        max_depth=6,                 # Depth of each tree
        learning_rate=0.08,          # Learning speed
        subsample=0.9,               # Row sampling per tree
        colsample_bytree=0.9,        # Feature sampling per tree
        scale_pos_weight=scale_pos_weight,  # Handles class imbalance
        eval_metric="logloss",      # Training evaluation metric
        n_jobs=-1,                   # Use all CPU cores
        random_state=42,
    ),
}


# =======================
# 11. TRAIN AND EVALUATE EACH MODEL
# =======================

results = {}     # Dictionary to store metric results
roc_curves = {}  # Dictionary to store ROC curve points

for name, model in models.items():  # Loop through each model

    # Logistic Regression requires scaled data
    if name == "Logistic Regression":
        model.fit(X_train_scaled, y_train)
        preds = model.predict(X_test_scaled)
        probs = model.predict_proba(X_test_scaled)[:, 1]

    else:  # Tree‑based models use original (unscaled) data
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        probs = model.predict_proba(X_test)[:, 1]

    # Calculate evaluation metrics
    acc = accuracy_score(y_test, preds)
    prec = precision_score(y_test, preds)
    rec = recall_score(y_test, preds)
    f1 = f1_score(y_test, preds)
    roc_auc = roc_auc_score(y_test, probs)

    # Store results for comparison table
    results[name] = [acc, prec, rec, f1, roc_auc]

    # Compute ROC curve points
    fpr, tpr, _ = roc_curve(y_test, probs)
    roc_curves[name] = (fpr, tpr, roc_auc)

    # Print results clearly in terminal
    print(f"\n========== {name} ==========")
    print("Accuracy :", acc)
    print("Precision:", prec)
    print("Recall   :", rec)
    print("F1 Score :", f1)
    print("ROC AUC  :", roc_auc)


# =======================
# 12. CREATE MODEL COMPARISON TABLE
# =======================

results_df = pd.DataFrame(
    results,
    index=["Accuracy", "Precision", "Recall", "F1", "ROC‑AUC"],
).T

print("\n========== MODEL COMPARISON TABLE ==========")
print(results_df)


# =======================
# 13. PLOT ROC CURVES FOR ALL MODELS
# =======================

plt.figure(figsize=(8, 6))

for name, (fpr, tpr, roc_auc) in roc_curves.items():
    plt.plot(fpr, tpr, label=f"{name} (AUC={roc_auc:.3f})")

plt.plot([0, 1], [0, 1], linestyle="--")  # Random guess reference line
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate (Recall)")
plt.title("ROC Curve Comparison — Heart Disease Models")
plt.legend()
plt.show()


# =======================
# 14. SELECT BEST MODEL BASED ON ROC‑AUC
# =======================

best_model_name = results_df["ROC‑AUC"].idxmax()  # Model with highest ROC‑AUC
best_model = models[best_model_name]               # Retrieve that model object

print("\nBest model based on ROC‑AUC:", best_model_name)


# =======================
# 15. SAVE FINAL MODEL FOR DEPLOYMENT
# =======================

joblib.dump(best_model, "final_heart_model.pkl")  # Save ML model
joblib.dump(scaler, "scaler.pkl")                # Save scaler for future predictions

print("\nFINAL MODEL SAVED — READY FOR BACKEND ✔")


# =======================
# 16. DECISION THRESHOLD TUNING (BALANCED RECALL + PRECISION)
# =======================

# Instead of always using probability threshold = 0.5,
# we scan multiple thresholds to find the best balance
# between Recall and Precision (important for real deployment).

best_threshold = 0.5        # Default starting threshold
best_f1 = 0                 # We will track the best F1 score
best_recall = 0             # Store recall at best threshold
best_precision = 0          # Store precision at best threshold

# Use probabilities from the BEST selected model
if best_model_name == "Logistic Regression":
    probs = best_model.predict_proba(X_test_scaled)[:, 1]
else:
    probs = best_model.predict_proba(X_test)[:, 1]

# Try many threshold values between 0.1 and 0.9
for threshold in np.arange(0.1, 0.9, 0.01):

    preds = (probs >= threshold).astype(int)  # Convert probability → class label

    prec = precision_score(y_test, preds)
    rec = recall_score(y_test, preds)
    f1 = f1_score(y_test, preds)

    # Choose threshold with highest F1 (balanced precision & recall)
    if f1 > best_f1:
        best_f1 = f1
        best_threshold = threshold
        best_recall = rec
        best_precision = prec

print("\n========== BEST THRESHOLD ANALYSIS ==========")
print("Best Threshold :", round(best_threshold, 2))
print("Precision @ Best Threshold:", best_precision)
print("Recall @ Best Threshold   :", best_recall)
print("F1 Score @ Best Threshold :", best_f1)


# =======================
# 17. SAVE FINAL MODEL FOR DEPLOYMENT
# =======================

# Save the trained best model and scaler
joblib.dump(best_model, "final_heart_model.pkl")
joblib.dump(scaler, "scaler.pkl")

# Also save the chosen decision threshold for real predictions
joblib.dump(best_threshold, "decision_threshold.pkl")

print("\nFINAL MODEL + THRESHOLD SAVED — READY FOR BACKEND ✔")


# ============================================================
# END OF SCRIPT
# ============================================================
# Your project now includes:
# - Real dataset ML pipeline
# - Multiple model comparison
# - Medical metric prioritization (Recall + ROC‑AUC)
# - ROC curve visualization
# - Automatic best‑model selection
# - Decision threshold tuning (industry practice)
# - Fully deployable saved model + threshold
#
# NEXT STEP:
# → Build Flask prediction API
# → Then React frontend healthcare website
# ============================================================
