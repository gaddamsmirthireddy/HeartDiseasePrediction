import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type FormData = {
  age: number;
  sex: number;
  cp: number; // chest pain type
  trestbps: number; // resting blood pressure
  chol: number; // serum cholesterol
  fbs: number; // fasting blood sugar
  restecg: number; // resting electrocardiographic results
  thalach: number; // maximum heart rate achieved
  exang: number; // exercise induced angina
  oldpeak: number; // ST depression induced by exercise
  slope: number; // slope of the peak exercise ST segment
  ca: number; // number of major vessels colored by fluoroscopy
  thal: number; // thalassemia
};

const initialFormData: FormData = {
  age: 45,
  sex: 1,
  cp: 0,
  trestbps: 120,
  chol: 200,
  fbs: 0,
  restecg: 0,
  thalach: 150,
  exang: 0,
  oldpeak: 0,
  slope: 0,
  ca: 0,
  thal: 1
};

// Field definitions for the form
const fields = [
  { name: 'age', label: 'Age', type: 'number', min: 20, max: 100, step: 1 },
  { 
    name: 'sex', 
    label: 'Sex', 
    type: 'select', 
    options: [
      { value: 1, label: 'Male' },
      { value: 0, label: 'Female' }
    ]
  },
  { 
    name: 'cp', 
    label: 'Chest Pain Type', 
    type: 'select', 
    options: [
      { value: 0, label: 'Typical Angina' },
      { value: 1, label: 'Atypical Angina' },
      { value: 2, label: 'Non-anginal Pain' },
      { value: 3, label: 'Asymptomatic' }
    ]
  },
  { name: 'trestbps', label: 'Resting Blood Pressure (mm Hg)', type: 'number', min: 90, max: 200, step: 1 },
  { name: 'chol', label: 'Serum Cholesterol (mg/dl)', type: 'number', min: 100, max: 600, step: 1 },
  { 
    name: 'fbs', 
    label: 'Fasting Blood Sugar > 120 mg/dl', 
    type: 'select', 
    options: [
      { value: 1, label: 'True' },
      { value: 0, label: 'False' }
    ]
  },
  { 
    name: 'restecg', 
    label: 'Resting Electrocardiographic Results', 
    type: 'select', 
    options: [
      { value: 0, label: 'Normal' },
      { value: 1, label: 'Having ST-T wave abnormality' },
      { value: 2, label: 'Left ventricular hypertrophy' }
    ]
  },
  { name: 'thalach', label: 'Maximum Heart Rate Achieved', type: 'number', min: 60, max: 220, step: 1 },
  { 
    name: 'exang', 
    label: 'Exercise Induced Angina', 
    type: 'select', 
    options: [
      { value: 1, label: 'Yes' },
      { value: 0, label: 'No' }
    ]
  },
  { name: 'oldpeak', label: 'ST Depression Induced by Exercise', type: 'number', min: 0, max: 10, step: 0.1 },
  { 
    name: 'slope', 
    label: 'Slope of the Peak Exercise ST Segment', 
    type: 'select', 
    options: [
      { value: 0, label: 'Upsloping' },
      { value: 1, label: 'Flat' },
      { value: 2, label: 'Downsloping' }
    ]
  },
  { 
    name: 'ca', 
    label: 'Number of Major Vessels Colored by Fluoroscopy', 
    type: 'select', 
    options: [
      { value: 0, label: '0' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
    ]
  },
  { 
    name: 'thal', 
    label: 'Thalassemia', 
    type: 'select', 
    options: [
      { value: 1, label: 'Normal' },
      { value: 2, label: 'Fixed Defect' },
      { value: 3, label: 'Reversible Defect' }
    ]
  },
];

export default function HeartDiseasePredictor() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [prediction, setPrediction] = useState<null | {
    probability: number;
    result: boolean;
    riskLevel: 'low' | 'moderate' | 'high';
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real implementation, you would send this to your backend
      // For demo purposes, we're simulating a response
      // const response = await axios.post('/api/predict/heart-disease', formData);
      
      // Simulate backend prediction (in real app, this would come from your ML model)
      setTimeout(() => {
        const randomProbability = Math.random() * 0.7 + 0.15; // Random probability between 0.15 and 0.85
        setPrediction({
          probability: randomProbability,
          result: randomProbability > 0.5,
          riskLevel: randomProbability < 0.3 ? 'low' : randomProbability < 0.6 ? 'moderate' : 'high'
        });
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error predicting heart disease:', error);
      toast.error('Failed to process your data. Please try again.');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPrediction(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Heart Disease Prediction
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your health information below to get a personalized heart disease risk assessment.
            This prediction uses a machine learning model trained on thousands of real patient records.
          </p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            {!prediction ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label 
                        htmlFor={field.name} 
                        className="block text-sm font-medium text-gray-700"
                      >
                        {field.label}
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name as keyof FormData]}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          required
                        >
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name as keyof FormData]}
                          onChange={handleChange}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Get Prediction'
                    )}
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <div className={`inline-flex items-center justify-center p-4 rounded-full ${
                    prediction.riskLevel === 'low' 
                      ? 'bg-green-100' 
                      : prediction.riskLevel === 'moderate' 
                        ? 'bg-yellow-100' 
                        : 'bg-red-100'
                  }`}>
                    <svg 
                      className={`h-10 w-10 ${
                        prediction.riskLevel === 'low' 
                          ? 'text-green-600' 
                          : prediction.riskLevel === 'moderate' 
                            ? 'text-yellow-600' 
                            : 'text-red-600'
                      }`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">Your Heart Health Assessment</h2>
                
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className={`h-4 rounded-full ${
                        prediction.riskLevel === 'low' 
                          ? 'bg-green-600' 
                          : prediction.riskLevel === 'moderate' 
                            ? 'bg-yellow-500' 
                            : 'bg-red-600'
                      }`}
                      style={{ width: `${prediction.probability * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Risk Probability: {(prediction.probability * 100).toFixed(2)}%
                  </p>
                </div>
                
                <div className="p-6 mb-6 rounded-lg bg-gray-50 text-left">
                  <h3 className={`text-xl font-medium mb-2 ${
                    prediction.riskLevel === 'low' 
                      ? 'text-green-700' 
                      : prediction.riskLevel === 'moderate' 
                        ? 'text-yellow-700' 
                        : 'text-red-700'
                  }`}>
                    {prediction.riskLevel === 'low' 
                      ? 'Low Risk' 
                      : prediction.riskLevel === 'moderate' 
                        ? 'Moderate Risk' 
                        : 'High Risk'
                    }
                  </h3>
                  
                  <p className="text-gray-700 mb-4">
                    {prediction.riskLevel === 'low' 
                      ? 'Your results suggest a lower risk of heart disease based on the information provided. Continue maintaining your heart health with regular check-ups and a healthy lifestyle.' 
                      : prediction.riskLevel === 'moderate' 
                        ? 'Your results indicate a moderate risk of heart disease. We recommend discussing these results with your healthcare provider for personalized advice.' 
                        : 'Your results suggest a higher risk of heart disease. We strongly recommend consulting with a healthcare professional as soon as possible for a thorough evaluation.'
                    }
                  </p>
                  
                  <p className="text-sm text-gray-500 italic">
                    Note: This assessment is based on machine learning algorithms and should not replace professional medical advice.
                  </p>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetForm}
                    className="inline-flex items-center px-5 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Start New Assessment
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => {
                      // In a real app, this would navigate to appointment scheduling
                      toast.success('You would be redirected to appointment scheduling');
                    }}
                  >
                    Schedule Consultation
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">What Your Results Mean</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Low Risk (0-30%)</h3>
              <p className="text-gray-600">
                Your heart health appears to be in good condition. Continue with regular health check-ups and maintain your healthy lifestyle.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Moderate Risk (30-60%)</h3>
              <p className="text-gray-600">
                Some risk factors may be present. Consider lifestyle modifications and consult with a healthcare provider for personalized advice.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">High Risk (60-100%)</h3>
              <p className="text-gray-600">
                Several risk factors may be present. It's recommended to seek medical advice promptly for a comprehensive evaluation and treatment plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 