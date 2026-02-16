import { useState, useRef } from 'react';
import { Hero } from './components/Hero';
import { PredictionForm } from './components/PredictionForm';
import { ResultDisplay } from './components/ResultDisplay';
import { ModelInfo } from './components/ModelInfo';
import './index.css';

function App() {
  const [predictionResult, setPredictionResult] = useState(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePredictionComplete = (result) => {
    setPredictionResult(result);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setPredictionResult(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Model Info Section */}
      <ModelInfo />

      {/* Prediction Form */}
      <div ref={formRef} className="bg-slate-50 border-t border-slate-100">
        <PredictionForm onPredictionComplete={handlePredictionComplete} />
      </div>

      {/* Results Section */}
      {predictionResult && (
        <div ref={resultRef} className="bg-white border-t border-slate-100">
          <ResultDisplay result={predictionResult} onReset={handleReset} />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">AI</span>
                <span className="text-xl font-bold text-white tracking-tight">Heart Risk Predictor</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                Advanced clinical decision support system powered by logistic regression analysis.
                Optimized for high recall to ensure early detection of cardiovascular risks.
                Trained on validated medical datasets.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Model Specifications</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Algorithm: Logistic Regression
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Training Data: 319,795 Records
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Input Features: 18 Clinical Markers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Optimization: Grid Search CV
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Performance</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Accuracy: 91.5%
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Sensitivity: 0.82
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Diff. Privacy: Applied
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>© 2026 Heart Risk AI | Shambo Das | Research and Educational Use Only</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span>Machine Learning Model</span>
              <span>•</span>
              <span>Flask API</span>
              <span>•</span>
              <span>Modern Web Interface</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
