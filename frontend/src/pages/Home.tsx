import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-500/90 via-red-600/90 to-red-700/90 overflow-hidden">
        <div className="absolute inset-0">
          <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.1" d="M1440 0H0V800H1440V0Z" fill="white" />
            {/* Heart beat line animation */}
            <motion.path 
              d="M-100,320 L200,320 L240,120 L280,520 L320,200 L360,400 L400,320 L1600,320"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', ease: "easeInOut" }}
              fill="transparent"
            />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 relative z-10">
          <div className="lg:w-1/2">
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Your Heart Health
                <span className="block text-white">Starts Here</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-white">
                Our AI-powered platform helps predict heart disease risk using advanced algorithms.
                Get personalized insights and connect with healthcare professionals.
              </p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/predictor')}
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-red-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/how-it-works')}
                  className="text-lg font-semibold leading-6 text-white hover:text-gray-100 flex items-center"
                >
                  Learn more <span aria-hidden="true" className="ml-1">→</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 lg:mt-0 lg:w-1/2">
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 overflow-hidden border border-white/30">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative aspect-[16/9] overflow-hidden rounded-xl"
                >
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Heart icon */}
                    <motion.path
                      d="M200 250C200 250 110 180 60 130C10 80 10 10 80 10C150 10 200 80 200 80C200 80 250 10 320 10C390 10 390 80 340 130C290 180 200 250 200 250Z"
                      fill="#ffffff"
                      strokeWidth="8"
                      stroke="#ff4f5e"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: 'reverse', 
                        ease: "easeInOut"
                      }}
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Taking Care of Your Heart Has Never Been Easier
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Our comprehensive platform provides the tools you need to monitor and improve your heart health.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Prediction</h3>
              <p className="text-gray-600">Our machine learning algorithms analyze your health data to provide accurate heart disease risk assessments.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gemini-Powered Assistant</h3>
              <p className="text-gray-600">Get answers to your health questions instantly with our Gemini-powered AI chatbot.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointment Scheduling</h3>
              <p className="text-gray-600">Easily book appointments with healthcare professionals based on your prediction results.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-r from-red-500 to-red-700 rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-16">
              <div className="lg:w-3/5 xl:w-2/3">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to take control of your heart health?
                </h2>
                <p className="mt-4 text-lg text-red-100">
                  Join thousands of users who have already taken the first step towards a healthier heart.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-red-600 shadow-sm hover:bg-gray-50"
                >
                  Get Started Today
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 