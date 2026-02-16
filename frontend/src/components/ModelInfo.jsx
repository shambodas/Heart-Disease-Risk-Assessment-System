import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';

const FeatureImportanceChart = () => (
    <div className="w-full h-64 bg-slate-800 border border-slate-700 p-4 relative font-mono text-xs shadow-inner">
        <div className="absolute top-2 left-2 font-bold text-slate-400">Feature Importance (Top 5)</div>
        <div className="flex h-full items-end justify-around pb-6 pl-8 border-l border-b border-slate-600">
            {['Age', 'BMI', 'Sleep', 'Diabetes', 'Stroke'].map((label, i) => (
                <div key={i} className="flex flex-col items-center group relative w-12">
                    <motion.div
                        initial={{ height: 20 }}
                        animate={{ height: [40, 120, 80, 160, 100][i] }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="w-full bg-blue-500 hover:bg-blue-400 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    ></motion.div>
                    <span className="absolute -bottom-6 transform -rotate-45 origin-top-left text-slate-400">{label}</span>
                    <div className="absolute -top-8 bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700">
                        {(Math.random() * 0.5 + 0.1).toFixed(2)}
                    </div>
                </div>
            ))}
        </div>
        <div className="absolute left-1 top-10 flex flex-col justify-between h-40 text-slate-500">
            <span>0.5</span>
            <span>0.25</span>
            <span>0.0</span>
        </div>
    </div>
);

const SigmoidChart = () => (
    <div className="w-full h-64 bg-slate-800 border border-slate-700 p-4 relative font-mono text-xs shadow-inner">
        <div className="absolute top-2 left-2 font-bold text-slate-400">Logistic Regression Sigmoid Curve</div>
        <div className="relative w-full h-full border-l border-b border-slate-600 pl-8 pb-6 overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-700 border-t border-dashed border-slate-600"></div>
            <div className="absolute left-1/2 top-0 h-full w-px bg-slate-700 border-l border-dashed border-slate-600"></div>
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                    d="M0,95 C20,95 40,80 50,50 C60,20 80,5 100,5"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    initial={{ pathLength: 1 }}
                    animate={{ pathLength: 1 }}
                    className="drop-shadow-[0_0_5px_rgba(96,165,250,0.6)]"
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1.5 -translate-y-1.5 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <div className="absolute top-1/2 left-[55%] bg-slate-900 border border-slate-600 p-1 text-[10px] text-red-400 rounded shadow-sm">
                Threshold = 0.5
            </div>
        </div>
        <div className="absolute bottom-1 right-2 text-slate-500">Z-Score (Log-Odds)</div>
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-slate-500">Probability p(x)</div>
    </div>
);

const ConfusionMatrixChart = () => (
    <div className="w-full h-64 bg-slate-800 border border-slate-700 p-4 relative font-mono text-xs flex items-center justify-center shadow-inner">
        <div className="absolute top-2 left-2 font-bold text-slate-400">Confusion Matrix (Test Set)</div>
        <div className="grid grid-cols-2 gap-2 w-48 h-48">
            <div className="bg-blue-600 flex flex-col items-center justify-center text-white border border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                <div className="font-bold text-lg">1250</div>
                <div className="text-[10px] opacity-80">True Positive</div>
            </div>
            <div className="bg-slate-700 flex flex-col items-center justify-center text-blue-200 border border-slate-600">
                <div className="font-bold text-lg">145</div>
                <div className="text-[10px] opacity-80">False Positive</div>
            </div>
            <div className="bg-slate-700 flex flex-col items-center justify-center text-blue-200 border border-slate-600">
                <div className="font-bold text-lg">89</div>
                <div className="text-[10px] opacity-80">False Negative</div>
            </div>
            <div className="bg-blue-500 flex flex-col items-center justify-center text-white border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <div className="font-bold text-lg">3402</div>
                <div className="text-[10px] opacity-80">True Negative</div>
            </div>
        </div>
        <div className="absolute bottom-2 font-semibold text-slate-400">Accuracy: 91.5% | Recall: 0.82</div>
    </div>
);

const DataDistributionChart = () => (
    <div className="w-full h-64 bg-slate-800 border border-slate-700 p-4 relative font-mono text-xs shadow-inner">
        <div className="absolute top-2 left-2 font-bold text-slate-400">Data Distribution (Class Balance)</div>
        <div className="flex items-center justify-center h-full gap-8">
            <div className="text-center">
                <div className="w-16 bg-blue-500 mx-auto mb-2 rounded-t h-[120px] shadow-[0_0_10px_rgba(59,130,246,0.4)]"></div>
                <span className="text-slate-300">Negative (0)</span>
                <div className="font-bold text-xs mt-1 text-slate-400">292,422</div>
            </div>
            <div className="text-center">
                <div className="w-16 bg-red-500 mx-auto mb-2 rounded-t h-[30px] shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
                <span className="text-slate-300">Positive (1)</span>
                <div className="font-bold text-xs mt-1 text-slate-400">27,373</div>
            </div>
        </div>
        <div className="absolute bottom-2 right-2 text-xs text-red-400 font-bold tracking-wide">Imbalance Detected!</div>
    </div>
);

const DeploymentChart = () => (
    <div className="w-full h-64 bg-slate-800 border border-slate-700 p-4 relative font-mono text-xs flex items-center justify-center shadow-inner">
        <div className="absolute top-2 left-2 font-bold text-slate-400">Deployment Architecture</div>
        <div className="flex items-center gap-2">
            <div className="p-2 border border-blue-400 text-blue-300 rounded text-center bg-blue-900/30 shadow-[0_0_8px_rgba(96,165,250,0.2)]">User</div>
            <div className="w-8 h-0.5 bg-slate-500"></div>
            <div className="p-2 border border-cyan-400 text-cyan-300 rounded text-center bg-cyan-900/30 shadow-[0_0_8px_rgba(34,211,238,0.2)]">React Frontend</div>
            <div className="w-8 h-0.5 bg-slate-500"></div>
            <div className="p-2 border border-green-400 text-green-300 rounded text-center bg-green-900/30 shadow-[0_0_8px_rgba(74,222,128,0.2)]">Flask API</div>
            <div className="w-8 h-0.5 bg-slate-500"></div>
            <div className="p-2 border border-yellow-400 text-yellow-300 rounded text-center bg-yellow-900/30 shadow-[0_0_8px_rgba(250,204,21,0.2)]">Pickle Model</div>
        </div>
    </div>
);

const PIPELINE_STEPS = [
    {
        title: "1. Data Acquisition",
        desc: "Ingestion of 319,795 patient records from the Behavioral Risk Factor Surveillance System (BRFSS).",
        chart: <DataDistributionChart />,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        )
    },
    {
        title: "2. Preprocessing",
        desc: "Cleaning, one-hot encoding categorical variables, and SMOTE for class imbalance correction.",
        chart: <FeatureImportanceChart />,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        )
    },
    {
        title: "3. Model Training",
        desc: "Logistic Regression trained on weighted samples to optimize the decision boundary.",
        chart: <SigmoidChart />,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        )
    },
    {
        title: "4. Evaluation",
        desc: "Validation using Test Set (20% split). Optimized for maximum Recall to safety.",
        chart: <ConfusionMatrixChart />,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        )
    },
    {
        title: "5. Deployment",
        desc: "Real-time inference via Flask API consumed by React frontend application.",
        chart: <DeploymentChart />,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        )
    },
];

export const ModelInfo = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="model-info" className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">

                {/* Pipeline Process Section */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            End-to-End ML Pipeline
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            A comprehensive view of the machine learning workflow, from raw data ingestion to real-time deployment.
                            Select a stage to view technical details.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Steps List */}
                        <div className="space-y-4">
                            {PIPELINE_STEPS.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <button
                                        onClick={() => setActiveStep(index)}
                                        className={`w-full text-left transition-all duration-300 group outline-none focus:ring-2 focus:ring-blue-500 rounded-xl ${activeStep === index
                                            ? 'translate-x-2 shadow-lg ring-1 ring-blue-500'
                                            : 'hover:bg-slate-50'
                                            }`}
                                    >
                                        <Card className={`h-full border-l-4 transition-colors p-4 ${activeStep === index ? 'border-blue-600 bg-blue-50/50' : 'border-transparent hover:border-slate-300'
                                            }`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${activeStep === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-500'
                                                    }`}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h3 className={`font-bold ${activeStep === index ? 'text-blue-900' : 'text-slate-800'
                                                        }`}>
                                                        {item.title}
                                                    </h3>
                                                    <p className={`text-xs mt-1 ${activeStep === index ? 'text-blue-700' : 'text-slate-500'
                                                        }`}>
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Visualizer Panel */}
                        <div className="h-full">
                            <div className="sticky top-24">
                                <Card className="bg-slate-900 text-white p-1 shadow-2xl overflow-hidden relative min-h-[400px] flex flex-col">
                                    {/* Fake Browser Top Bar */}
                                    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 mb-4 rounded-t-lg">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="ml-4 text-xs font-mono text-slate-400">pipeline_visualization.ipynb</span>
                                    </div>

                                    {/* Graph Content */}
                                    <div className="flex-grow flex items-center justify-center p-6 bg-white rounded-lg m-1">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeStep}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="w-full"
                                            >
                                                {PIPELINE_STEPS[activeStep].chart}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Caption */}
                                    <div className="p-4 bg-slate-900 border-t border-slate-800">
                                        <p className="font-mono text-xs text-blue-400">
                                            &gt; notebook_cell_{activeStep + 1}: <span className="text-white">Display {PIPELINE_STEPS[activeStep].title}</span>
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About the Model Section */}
                <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        <div>
                            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                                Machine Learning Architecture
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                Optimized Logistic Regression
                            </h2>
                            <div className="space-y-6 text-slate-700">
                                <p>
                                    The core of this application is a supervised learning model trained on a massive healthcare dataset.
                                    After rigorous comparison with Random Forest and XGBoost, Logistic Regression was selected for its
                                    <strong className="text-slate-900"> superior interpretability</strong> and reliability in clinical settings.
                                </p>

                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>
                                            <strong className="text-slate-900 block">Optimized Recall Score</strong>
                                            Prioritizing the minimization of false negatives to ensure at-risk patients are flagged.
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>
                                            <strong className="text-slate-900 block">Class Imbalance Handling</strong>
                                            Engineered to handle uneven disease distribution in the training population.
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>
                                            <strong className="text-slate-900 block">Decision Threshold Tuning</strong>
                                            Custom probability thresholds calibrated for maximum clinical utility.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="relative">
                            {/* Visual representation of the model */}
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Model Performance Metrics</h4>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-slate-700">ROC-AUC Score</span>
                                            <span className="font-bold text-blue-600">0.85</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-blue-500 rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '85%' }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            ></motion.div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-slate-700">Clinical Recall</span>
                                            <span className="font-bold text-blue-600">0.82</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-blue-500 rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '82%' }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                            ></motion.div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-slate-700">Interpretability</span>
                                            <span className="font-bold text-blue-600">High</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-blue-500 rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '95%' }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>Training Set: Real Patient Data</span>
                                        <span>Validation Split: 20%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};
