import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

export const PredictionForm = ({ onPredictionComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        BMI: '',
        Smoking: '',
        AlcoholDrinking: '',
        Stroke: '',
        PhysicalHealth: '',
        MentalHealth: '',
        DiffWalking: '',
        Sex: '',
        AgeCategory: '',
        Race: '',
        Diabetic: '',
        PhysicalActivity: '',
        GenHealth: '',
        SleepTime: '',
        Asthma: '',
        KidneyDisease: '',
        SkinCancer: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData);
            onPredictionComplete(response.data);
        } catch (err) {
            setError(
                err.response?.data?.error ||
                'Failed to connect to the prediction service. Please ensure the Flask backend is running on http://127.0.0.1:5000'
            );
            console.error('Prediction error:', err);
        } finally {
            setLoading(false);
        }
    };

    const yesNoOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ];

    const sexOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
    ];

    const ageCategoryOptions = [
        { value: '18-24', label: '18-24 years' },
        { value: '25-29', label: '25-29 years' },
        { value: '30-34', label: '30-34 years' },
        { value: '35-39', label: '35-39 years' },
        { value: '40-44', label: '40-44 years' },
        { value: '45-49', label: '45-49 years' },
        { value: '50-54', label: '50-54 years' },
        { value: '55-59', label: '55-59 years' },
        { value: '60-64', label: '60-64 years' },
        { value: '65-69', label: '65-69 years' },
        { value: '70-74', label: '70-74 years' },
        { value: '75-79', label: '75-79 years' },
        { value: '80 or older', label: '80 or older' }
    ];

    const raceOptions = [
        { value: 'White', label: 'White' },
        { value: 'Black', label: 'Black' },
        { value: 'Asian', label: 'Asian' },
        { value: 'American Indian/Alaskan Native', label: 'American Indian/Alaskan Native' },
        { value: 'Hispanic', label: 'Hispanic' },
        { value: 'Other', label: 'Other' }
    ];

    const diabeticOptions = [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
        { value: 'No, borderline diabetes', label: 'No, borderline diabetes' },
        { value: 'Yes (during pregnancy)', label: 'Yes (during pregnancy)' }
    ];

    const genHealthOptions = [
        { value: 'Excellent', label: 'Excellent' },
        { value: 'Very good', label: 'Very good' },
        { value: 'Good', label: 'Good' },
        { value: 'Fair', label: 'Fair' },
        { value: 'Poor', label: 'Poor' }
    ];

    return (
        <section id="prediction-form" className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Health Risk Assessment
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Please provide accurate information for the most reliable risk assessment.
                            All data is processed securely and never stored.
                        </p>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit}>
                            {/* Demographics Section */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-medical-200">
                                    Demographics
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        label="Sex"
                                        name="Sex"
                                        value={formData.Sex}
                                        onChange={handleChange}
                                        options={sexOptions}
                                        required
                                    />
                                    <Select
                                        label="Age Category"
                                        name="AgeCategory"
                                        value={formData.AgeCategory}
                                        onChange={handleChange}
                                        options={ageCategoryOptions}
                                        required
                                    />
                                    <Select
                                        label="Race/Ethnicity"
                                        name="Race"
                                        value={formData.Race}
                                        onChange={handleChange}
                                        options={raceOptions}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Physical Health Section */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-medical-200">
                                    Physical Health Metrics
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Body Mass Index (BMI)"
                                        name="BMI"
                                        type="number"
                                        value={formData.BMI}
                                        onChange={handleChange}
                                        placeholder="e.g., 25.5"
                                        helperText="Weight (kg) / Height (m)²"
                                        required
                                        min="10"
                                        max="100"
                                        step="0.1"
                                    />
                                    <Input
                                        label="Physical Health (Poor Days)"
                                        name="PhysicalHealth"
                                        type="number"
                                        value={formData.PhysicalHealth}
                                        onChange={handleChange}
                                        placeholder="0-30"
                                        helperText="Days of poor physical health in past 30 days"
                                        required
                                        min="0"
                                        max="30"
                                    />
                                    <Input
                                        label="Mental Health (Poor Days)"
                                        name="MentalHealth"
                                        type="number"
                                        value={formData.MentalHealth}
                                        onChange={handleChange}
                                        placeholder="0-30"
                                        helperText="Days of poor mental health in past 30 days"
                                        required
                                        min="0"
                                        max="30"
                                    />
                                    <Input
                                        label="Sleep Time (Hours)"
                                        name="SleepTime"
                                        type="number"
                                        value={formData.SleepTime}
                                        onChange={handleChange}
                                        placeholder="e.g., 7"
                                        helperText="Average hours of sleep per night"
                                        required
                                        min="1"
                                        max="24"
                                    />
                                    <Select
                                        label="General Health"
                                        name="GenHealth"
                                        value={formData.GenHealth}
                                        onChange={handleChange}
                                        options={genHealthOptions}
                                        helperText="Overall health perception"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Lifestyle Factors Section */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-medical-200">
                                    Lifestyle Factors
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        label="Smoking Status"
                                        name="Smoking"
                                        value={formData.Smoking}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        helperText="Have you smoked at least 100 cigarettes in your lifetime?"
                                        required
                                    />
                                    <Select
                                        label="Alcohol Drinking"
                                        name="AlcoholDrinking"
                                        value={formData.AlcoholDrinking}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        helperText="Heavy drinkers (adult men >14 drinks/week, women >7 drinks/week)"
                                        required
                                    />
                                    <Select
                                        label="Physical Activity"
                                        name="PhysicalActivity"
                                        value={formData.PhysicalActivity}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        helperText="Physical activity in past 30 days (not including job)"
                                        required
                                    />
                                    <Select
                                        label="Difficulty Walking"
                                        name="DiffWalking"
                                        value={formData.DiffWalking}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        helperText="Do you have serious difficulty walking or climbing stairs?"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Medical History Section */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-medical-200">
                                    Medical History
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        label="Stroke History"
                                        name="Stroke"
                                        value={formData.Stroke}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        helperText="Ever told you had a stroke?"
                                        required
                                    />
                                    <Select
                                        label="Diabetic Status"
                                        name="Diabetic"
                                        value={formData.Diabetic}
                                        onChange={handleChange}
                                        options={diabeticOptions}
                                        required
                                    />
                                    <Select
                                        label="Asthma"
                                        name="Asthma"
                                        value={formData.Asthma}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        helperText="Ever told you had asthma?"
                                        required
                                    />
                                    <Select
                                        label="Kidney Disease"
                                        name="KidneyDisease"
                                        value={formData.KidneyDisease}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        helperText="Not including kidney stones, bladder infection or incontinence"
                                        required
                                    />
                                    <Select
                                        label="Skin Cancer"
                                        name="SkinCancer"
                                        value={formData.SkinCancer}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        helperText="Ever told you had skin cancer?"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
                                >
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <Button type="submit" loading={loading} disabled={loading}>
                                    {loading ? 'Analyzing...' : 'Get Risk Assessment'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};
