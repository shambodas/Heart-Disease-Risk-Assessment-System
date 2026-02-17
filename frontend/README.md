# Heart Disease Risk Predictor

A modern, production-style React web application for AI-powered cardiovascular health risk assessment.

## 🎯 Features

- **Beautiful UI/UX**: Professional medical-grade design with soft blue gradients
- **Smooth Animations**: Framer Motion animations for engaging user experience
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **AI-Powered**: Connects to Flask ML backend for real-time predictions
- **Comprehensive Assessment**: Evaluates multiple health factors including:
  - Demographics (age, sex, race)
  - Physical health metrics (BMI, sleep, activity)
  - Lifestyle factors (smoking, alcohol, exercise)
  - Medical history (diabetes, stroke, chronic conditions)

## 🚀 Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Backend**: Flask (Python)
- **ML Models**: Scikit-learn

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Flask backend running on `http://localhost:5000`

## 🛠️ Installation

1. Navigate to the frontend directory:
```bash
cd "d:\PROJECTS\Heart disease prediction\frontend"
```

2. Install dependencies:
```bash
npm install
```

## 🎮 Running the Application

### Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔌 Backend Connection

This frontend connects to a Flask API endpoint:

- **Endpoint**: `POST http://localhost:5000/predict`
- **Request Body**: JSON with health metrics
- **Response**: Prediction result with probability and threshold

### Starting the Flask Backend

Before using the application, ensure your Flask backend is running:

```bash
cd "d:\PROJECTS\Heart disease prediction"
python flask_backend_app.py
```

## 📱 Application Flow

1. **Hero Section**: Landing page with call-to-action
2. **Health Assessment Form**: Comprehensive form with organized sections
3. **Risk Analysis**: AI processes the data
4. **Results Display**: 
   - Circular progress bar showing risk percentage
   - Risk level indicator (Low/Moderate/High)
   - Personalized recommendations
   - Medical disclaimer

## 🎨 Design Features

- **Medical Color Palette**: Soft blues (#0ea5e9) and whites
- **Typography**: Inter font family
- **Animations**: 
  - Fade-in effects
  - Slide-up transitions
  - Circular progress animations
  - Hover effects
- **Components**:
  - Reusable UI components (Button, Input, Select, Card)
  - Modular architecture
  - Clean code structure

## 📊 Risk Assessment Levels

- **Low Risk** (< 30%): Green indicator with maintenance recommendations
- **Moderate Risk** (30-60%): Yellow indicator with lifestyle modification suggestions
- **High Risk** (> 60%): Red indicator with medical consultation recommendations

## ⚠️ Medical Disclaimer

This application is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.

## 📄 License

This is an educational project demonstrating end-to-end machine learning healthcare web application development.

## 🤝 Contributing

This is a demonstration project. For improvements or suggestions, please reach out to the project maintainer.

---

**Built with ❤️ for better cardiovascular health outcomes**
