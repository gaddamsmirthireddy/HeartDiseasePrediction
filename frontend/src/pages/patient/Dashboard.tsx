import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Sample data for patient dashboard
const appointments = [
  { id: 1, doctor: 'Dr. Sarah Johnson', date: '2023-08-15', time: '10:30 AM', status: 'Scheduled' },
  { id: 2, doctor: 'Dr. Mark Williams', date: '2023-08-20', time: '2:00 PM', status: 'Scheduled' },
  { id: 3, doctor: 'Dr. Emily Chen', date: '2023-07-30', time: '11:15 AM', status: 'Completed' },
];

const healthMetrics = [
  { id: 1, name: 'Blood Pressure', value: '120/80', date: '2023-08-01', status: 'Normal' },
  { id: 2, name: 'Heart Rate', value: '72 bpm', date: '2023-08-01', status: 'Normal' },
  { id: 3, name: 'Cholesterol', value: '180 mg/dL', date: '2023-07-15', status: 'Normal' },
  { id: 4, name: 'Blood Sugar', value: '95 mg/dL', date: '2023-07-15', status: 'Normal' },
];

const recommendations = [
  { id: 1, title: 'Increase Physical Activity', description: 'Aim for at least 30 minutes of moderate exercise 5 days a week.' },
  { id: 2, title: 'Reduce Sodium Intake', description: 'Limit your daily sodium intake to help manage blood pressure.' },
  { id: 3, title: 'Regular Check-ups', description: 'Schedule your next heart check-up within 3 months.' },
];

export default function PatientDashboard() {
  const { user } = useAuth();
  const [heartRiskScore, setHeartRiskScore] = useState<number | null>(null);
  
  // Simulate fetching heart risk score
  useEffect(() => {
    // In a real app, this would come from an API
    setTimeout(() => {
      setHeartRiskScore(Math.floor(Math.random() * 100));
    }, 1000);
  }, []);
  
  const getRiskLevel = (score: number) => {
    if (score < 20) return { level: 'Low', color: 'text-green-600' };
    if (score < 50) return { level: 'Moderate', color: 'text-yellow-600' };
    return { level: 'High', color: 'text-red-600' };
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name || 'Patient'}</span>
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'Patient'}&background=random`} 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Heart Risk Score Card */}
            <motion.div 
              className="lg:col-span-1 bg-white rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">Heart Risk Score</h2>
              
              {heartRiskScore !== null ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-100">
                    <span className={`text-4xl font-bold ${getRiskLevel(heartRiskScore).color}`}>
                      {heartRiskScore}%
                    </span>
                  </div>
                  <p className={`mt-4 font-medium ${getRiskLevel(heartRiskScore).color}`}>
                    {getRiskLevel(heartRiskScore).level} Risk
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                  <button 
                    className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    View Details
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              )}
            </motion.div>
            
            {/* Quick Actions Card */}
            <motion.div 
              className="lg:col-span-3 bg-white rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/predictor" className="p-4 bg-red-50 rounded-lg text-center hover:bg-red-100 transition-colors">
                  <div className="text-red-600 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Heart Predictor</span>
                </Link>
                
                <Link to="/appointments" className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Book Appointment</span>
                </Link>
                
                <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors">
                  <div className="text-green-600 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Add Health Data</span>
                </button>
                
                <Link to="/contact" className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors">
                  <div className="text-purple-600 mb-2">
                    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Contact Doctor</span>
                </Link>
              </div>
            </motion.div>
            
            {/* Appointments Card */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
                  <Link to="/appointments" className="text-sm font-medium text-red-600 hover:text-red-500">
                    View all
                  </Link>
                </div>
                <div className="space-y-4">
                  {appointments
                    .filter(appointment => appointment.status === 'Scheduled')
                    .slice(0, 3)
                    .map(appointment => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{appointment.doctor}</p>
                            <p className="text-sm text-gray-500">{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {appointment.status}
                          </span>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="flex-1 bg-white text-sm text-gray-700 border border-gray-300 rounded-md py-1 hover:bg-gray-50">
                            Reschedule
                          </button>
                          <button className="flex-1 bg-white text-sm text-gray-700 border border-gray-300 rounded-md py-1 hover:bg-gray-50">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
            
            {/* Health Metrics Card */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Health Metrics</h2>
                  <button className="text-sm font-medium text-red-600 hover:text-red-500">
                    View all
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Metric
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {healthMetrics.map((metric) => (
                        <tr key={metric.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {metric.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {metric.value}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {new Date(metric.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {metric.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
            
            {/* Recommendations Card */}
            <motion.div 
              className="lg:col-span-4 bg-white rounded-lg shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">Personalized Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="text-md font-medium text-gray-900 mb-2">{recommendation.title}</h3>
                    <p className="text-sm text-gray-500">{recommendation.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
} 