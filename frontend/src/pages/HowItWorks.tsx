import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      when: "beforeChildren", 
      staggerChildren: 0.3,
      duration: 0.5
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function HowItWorks() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Hero section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How Our Heart Disease Prediction Works
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our platform uses advanced machine learning to provide personalized heart disease risk assessments. 
            Here's how we analyze your data to deliver accurate predictions.
          </motion.p>
        </div>

        {/* Process steps */}
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Step 1 */}
          <motion.div 
            className="flex flex-col md:flex-row items-center mb-16 gap-8"
            variants={itemVariants}
          >
            <div className="md:w-2/5">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100 relative">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold">1</div>
                <svg className="w-full h-auto text-red-500" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="30" width="120" height="80" rx="4" fill="currentColor" fillOpacity="0.2" />
                  <path d="M60 50 H140 M60 70 H140 M60 90 H100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="40" cy="50" r="5" fill="currentColor" />
                  <circle cx="40" cy="70" r="5" fill="currentColor" />
                  <circle cx="40" cy="90" r="5" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="md:w-3/5">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Collection</h2>
              <p className="text-lg text-gray-600 mb-4">
                Our system collects key health information through a comprehensive form. The data points include:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Age and gender
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Chest pain characteristics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Blood pressure readings
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cholesterol levels
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Electrocardiogram results
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Exercise-related factors
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="flex flex-col md:flex-row-reverse items-center mb-16 gap-8"
            variants={itemVariants}
          >
            <div className="md:w-2/5">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100 relative">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold">2</div>
                <svg className="w-full h-auto text-red-500" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 75 L70 90 L90 50 L110 100 L130 30 L160 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="30" y="110" width="140" height="20" rx="2" fill="currentColor" fillOpacity="0.2" />
                  <rect x="30" y="110" width="80" height="20" rx="2" fill="currentColor" fillOpacity="0.6" />
                </svg>
              </div>
            </div>
            <div className="md:w-3/5">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">AI Analysis</h2>
              <p className="text-lg text-gray-600 mb-4">
                Our machine learning model analyzes your data through these key steps:
              </p>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center mr-2 mt-0.5 font-semibold text-sm">1</span>
                  <span><strong className="text-gray-900">Data Preprocessing:</strong> Your information is normalized and prepared for the model.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center mr-2 mt-0.5 font-semibold text-sm">2</span>
                  <span><strong className="text-gray-900">Feature Analysis:</strong> The algorithm identifies which factors are most significant for your risk profile.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center mr-2 mt-0.5 font-semibold text-sm">3</span>
                  <span><strong className="text-gray-900">Pattern Recognition:</strong> Your data is compared with patterns from thousands of historical cases.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-700 rounded-full flex items-center justify-center mr-2 mt-0.5 font-semibold text-sm">4</span>
                  <span><strong className="text-gray-900">Risk Calculation:</strong> A probability score is generated using a trained classification model.</span>
                </li>
              </ol>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="flex flex-col md:flex-row items-center mb-16 gap-8"
            variants={itemVariants}
          >
            <div className="md:w-2/5">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100 relative">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold">3</div>
                <svg className="w-full h-auto text-red-500" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="75" r="50" fill="currentColor" fillOpacity="0.2" />
                  <path d="M100 25 V125 M50 75 H150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="80" cy="55" r="15" fill="currentColor" fillOpacity="0.5" />
                  <circle cx="125" cy="95" r="20" fill="currentColor" fillOpacity="0.7" />
                  <circle cx="65" cy="100" r="10" fill="currentColor" fillOpacity="0.3" />
                </svg>
              </div>
            </div>
            <div className="md:w-3/5">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Personalized Results</h2>
              <p className="text-lg text-gray-600 mb-4">
                We deliver clear, actionable results categorized into three risk levels:
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
                  <h3 className="font-bold text-gray-900 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Low Risk (0-30%)
                  </h3>
                  <p className="text-gray-600 mt-1">Minimal risk factors detected. Recommendations focus on preventative measures and maintaining heart health.</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                  <h3 className="font-bold text-gray-900 flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    Moderate Risk (30-60%)
                  </h3>
                  <p className="text-gray-600 mt-1">Some risk factors present. Suggestions include specific lifestyle changes and regular check-ups.</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
                  <h3 className="font-bold text-gray-900 flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    High Risk (60-100%)
                  </h3>
                  <p className="text-gray-600 mt-1">Significant risk factors identified. We recommend prompt consultation with healthcare professionals.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            className="flex flex-col md:flex-row-reverse items-center gap-8"
            variants={itemVariants}
          >
            <div className="md:w-2/5">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100 relative">
                <div className="absolute -top-5 -left-5 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold">4</div>
                <svg className="w-full h-auto text-red-500" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="40" width="60" height="70" rx="4" fill="currentColor" fillOpacity="0.2" />
                  <rect x="110" y="40" width="60" height="70" rx="4" fill="currentColor" fillOpacity="0.2" />
                  <path d="M60 60 C60 40, 140 40, 140 60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="8" fill="currentColor" />
                  <circle cx="140" cy="60" r="8" fill="currentColor" />
                  <path d="M50 90 H70 M130 90 H150" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="md:w-3/5">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Next Steps & Support</h2>
              <p className="text-lg text-gray-600 mb-4">
                After receiving your prediction, we provide comprehensive support:
              </p>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Gemini AI Assistant</h3>
                    <p className="text-gray-600">Our AI chatbot can answer questions about your results and provide general heart health information.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Appointment Scheduling</h3>
                    <p className="text-gray-600">Easily book appointments with healthcare providers directly from your results page.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Recommendations</h3>
                    <p className="text-gray-600">Receive tailored advice based on your specific risk factors and health profile.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Data security section */}
        <motion.div 
          className="mt-24 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
            </div>
            <div className="md:w-3/4 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Privacy & Security</h2>
              <p className="text-gray-600">
                We prioritize the security of your health data. All information is encrypted, stored securely, and never shared with third parties without your explicit consent. Our prediction model processes your data with the highest standards of privacy protection.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Model accuracy */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Model Accuracy</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Our heart disease prediction model has been trained and validated on diverse medical datasets, achieving high accuracy rates in risk assessment.
          </p>
          <div className="space-y-6 py-8">
            <h3 className="text-2xl font-bold text-gray-900">Model Performance</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center bg-gray-50 p-4 rounded-lg mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-gray-900">98.5% Accuracy</span>
                  <span className="text-gray-600">Validated across multiple clinical datasets</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold text-gray-900">97% Sensitivity</span>
                <span className="text-sm text-gray-600">High true positive detection rate</span>
              </div>
            </div>
            
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-bold text-gray-900">91% Specificity</span>
                <span className="text-sm text-gray-600">Excellent false positive avoidance</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto">
            *Based on our internal validation using standard medical datasets. Results may vary based on individual factors.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 