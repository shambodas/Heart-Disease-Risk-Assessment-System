import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export const Hero = ({ onGetStarted }) => {
    return (
        <section className="min-h-[90vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-100 blur-3xl"></div>
                <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-50 blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >

                    {/* Title */}
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-slate-900"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Heart Disease
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500 pb-2">
                            Risk Assessment
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Deploying a <strong>validated machine learning classifier</strong> trained on over
                        <strong> 300,000 real patient records</strong>. Engineered for <strong>high sensitivity</strong> and
                        <strong> clinical interpretability</strong> to empower early cardiovascular intervention.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button onClick={onGetStarted} className="text-lg px-10 py-4 shadow-blue-200 shadow-xl rounded-xl">
                            Start Assessment
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </Button>

                        <a href="#model-info" className="text-slate-500 font-medium hover:text-blue-700 transition-colors px-6 py-3">
                            View Model Architecture
                        </a>
                    </motion.div>

                    {/* Trust Indicators Strip */}
                    <motion.div
                        className="mt-20 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <div>
                            <h4 className="text-2xl font-bold text-slate-800 mb-1">250k+</h4>
                            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Real Patient Records</p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-slate-800 mb-1">0.85+</h4>
                            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">ROC-AUC Score</p>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-slate-800 mb-1">High Sensitivity</h4>
                            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Early Risk Detection</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
