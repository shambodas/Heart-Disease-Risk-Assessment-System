import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export const ResultDisplay = ({ result, onReset }) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);

    const probability = (result.probability * 100).toFixed(1);
    const prediction = result.prediction;
    const threshold = (result.threshold * 100).toFixed(1);

    // Determine risk level with more granular logic if needed, 
    // currently mapping robustly to the 3-tier system requested.
    const getRiskLevel = () => {
        if (probability < 30) return 'low';
        if (probability < 60) return 'moderate';
        return 'high';
    };

    const riskLevel = getRiskLevel();

    const riskConfig = {
        low: {
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            gradientFrom: 'from-green-500',
            gradientTo: 'to-green-400',
            label: 'Low Clinical Risk',
            icon: (
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            message: 'Patient indicators suggest a low probability of cardiovascular disease.',
            subMessage: 'Routine monitoring recommended consistent with standard age-related guidelines.',
            recommendations: [
                'Maintain current physical activity levels',
                'Continue balanced nutritional habits',
                'Standard annual health screenings'
            ]
        },
        moderate: {
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            gradientFrom: 'from-orange-500',
            gradientTo: 'to-orange-400',
            label: 'Moderate Clinical Risk',
            icon: (
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            message: 'Elevated risk factors detected. Clinical attention advised.',
            subMessage: 'Consider lifestyle interventions and closer monitoring of key vital signs.',
            recommendations: [
                'Review dietary sodium and lipid intake',
                'Increase cardiovascular exercise frequency',
                'Monitor blood pressure and BMI closely',
                'Schedule follow-up for lipid profile'
            ]
        },
        high: {
            color: 'text-red-700',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            gradientFrom: 'from-red-600',
            gradientTo: 'to-red-500',
            label: 'High Clinical Risk',
            icon: (
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            message: 'Significant risk factors identified. Immediate medical evaluation recommended.',
            subMessage: 'Probability exceeds clinical decision threshold. Diagnostic workup strongly suggested.',
            recommendations: [
                'Urgent consultation with cardiologist',
                'Comprehensive cardiovascular stress testing',
                'Strict management of risk factors (hypertension, diabetes)',
                'Immediate smoking cessation intervention',
                'Pharmacological review'
            ]
        }
    };

    const config = riskConfig[riskLevel];

    // Animate progress on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedProgress(parseFloat(probability));
        }, 100);
        return () => clearTimeout(timer);
    }, [probability]);

    // Calculate circle progress
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

    return (
        <section className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <Card className="text-center overflow-hidden border-t-8 border-blue-500 shadow-2xl">

                        {/* Header Strip */}
                        <div className="bg-slate-50 py-4 border-b border-slate-100 -mx-8 -mt-8 mb-10">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                                AI Prediction Analysis Result
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4 md:px-12 pb-12">

                            {/* Left Column: Visualization */}
                            <div className="flex flex-col items-center justify-center relative">
                                <motion.div
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="relative"
                                >
                                    <svg width="240" height="240" className="transform -rotate-90">
                                        <circle
                                            cx="120"
                                            cy="120"
                                            r={radius}
                                            stroke="#f1f5f9"
                                            strokeWidth="16"
                                            fill="none"
                                        />
                                        <motion.circle
                                            cx="120"
                                            cy="120"
                                            r={radius}
                                            stroke={`url(#gradient-${riskLevel})`}
                                            strokeWidth="16"
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ strokeDashoffset: circumference }}
                                            animate={{ strokeDashoffset }}
                                            transition={{ duration: 1.5, ease: 'easeOut' }}
                                            style={{
                                                strokeDasharray: circumference,
                                            }}
                                        />
                                        <defs>
                                            <linearGradient id={`gradient-${riskLevel}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" className={config.gradientFrom} stopOpacity="1" />
                                                <stop offset="100%" className={config.gradientTo} stopOpacity="1" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <div className={`text-6xl font-black ${config.color}`}>
                                                {animatedProgress}%
                                            </div>
                                            <div className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-wide">Risk Probability</div>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <div className="mt-8">
                                    <div className={`px-6 py-2 rounded-full border ${config.borderColor} ${config.bgColor} inline-flex items-center gap-3`}>
                                        {config.icon}
                                        <span className={`text-lg font-bold ${config.color}`}>{config.label}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Interpretation */}
                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-4 border-slate-100">
                                    Clinical Interpretation
                                </h3>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-8"
                                >
                                    <p className="text-lg font-medium text-slate-800 mb-2">
                                        {config.message}
                                    </p>
                                    <p className="text-slate-500 leading-relaxed">
                                        {config.subMessage}
                                    </p>
                                </motion.div>

                                <div className="bg-slate-50 rounded-lg p-5 mb-8 border border-slate-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Model Decision Threshold</span>
                                        <span className="text-sm font-mono font-bold text-slate-600">{threshold}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                                        <div className="bg-slate-400 h-1.5 rounded-full" style={{ width: `${threshold}%` }}></div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">
                                        *Probability &gt; {threshold}% triggers positive classification based on maximized Recall.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-slate-700 mb-2">Recommended Actions:</h4>
                                    {config.recommendations.map((rec, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <svg className={`w-5 h-5 ${config.color} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-slate-600 text-sm">{rec}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="bg-slate-50 p-6 -mx-8 -mb-8 mt-8 border-t border-slate-100 flex justify-between items-center">
                            <p className="text-xs text-slate-400 italic">
                                Generated by Logistic Regression Model (v1.0)
                            </p>
                            <Button onClick={onReset} variant="secondary" className="px-8">
                                Run New Prediction
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};
