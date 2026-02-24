import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export const BMICalculator = ({ onCalculate, onClose }) => {
    const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
    const [metric, setMetric] = useState({ height: '', weight: '' });
    const [imperial, setImperial] = useState({ ft: '', in: '', kg: '' });
    const [bmi, setBmi] = useState(null);

    const calculateBMI = () => {
        let h, w, calculatedBmi;
        if (unit === 'metric') {
            h = parseFloat(metric.height) / 100; // cm to m
            w = parseFloat(metric.weight);
            if (h > 0 && w > 0) {
                calculatedBmi = w / (h * h);
            }
        } else {
            h = (parseFloat(imperial.ft) * 12) + (parseFloat(imperial.in) || 0); // total inches
            const weightKg = parseFloat(imperial.kg);
            if (h > 0 && weightKg > 0) {
                const heightInMeters = h * 0.0254;
                calculatedBmi = weightKg / (heightInMeters * heightInMeters);
            }
        }

        if (calculatedBmi && !isNaN(calculatedBmi) && isFinite(calculatedBmi)) {
            setBmi(calculatedBmi.toFixed(1));
        } else {
            setBmi(null);
        }
    };

    useEffect(() => {
        calculateBMI();
    }, [metric, imperial, unit]);

    const handleApply = () => {
        if (bmi) {
            onCalculate(bmi);
            onClose();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-6 rounded-2xl shadow-xl border border-medical-100 max-w-md w-full relative"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-medical-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                BMI Calculator
            </h3>

            <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                <button
                    onClick={() => setUnit('metric')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${unit === 'metric' ? 'bg-white text-medical-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Metric (cm/kg)
                </button>
                <button
                    onClick={() => setUnit('imperial')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${unit === 'imperial' ? 'bg-white text-medical-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Imperial (ft/kg)
                </button>
            </div>

            <div className="space-y-4">
                {unit === 'metric' ? (
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Height (cm)"
                            type="number"
                            value={metric.height}
                            onChange={(e) => setMetric({ ...metric, height: e.target.value })}
                            placeholder="e.g. 175"
                        />
                        <Input
                            label="Weight (kg)"
                            type="number"
                            value={metric.weight}
                            onChange={(e) => setMetric({ ...metric, weight: e.target.value })}
                            placeholder="e.g. 70"
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Height (ft)"
                                type="number"
                                value={imperial.ft}
                                onChange={(e) => setImperial({ ...imperial, ft: e.target.value })}
                                placeholder="ft"
                            />
                            <Input
                                label="Height (in)"
                                type="number"
                                value={imperial.in}
                                onChange={(e) => setImperial({ ...imperial, in: e.target.value })}
                                placeholder="in"
                            />
                        </div>
                        <Input
                            label="Weight (kg)"
                            type="number"
                            value={imperial.kg}
                            onChange={(e) => setImperial({ ...imperial, kg: e.target.value })}
                            placeholder="e.g. 70"
                        />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {bmi && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 p-4 rounded-xl bg-medical-50 text-center"
                    >
                        <span className="text-sm text-medical-600 font-medium block mb-1">Your Calculated BMI</span>
                        <span className="text-3xl font-bold text-medical-700">{bmi}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-8 flex gap-3">
                <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    className="flex-1"
                    onClick={handleApply}
                    disabled={!bmi}
                >
                    Apply to Form
                </Button>
            </div>
        </motion.div>
    );
};
