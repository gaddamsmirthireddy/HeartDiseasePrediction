import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Sample data for doctor dashboard
const appointments = [
  { id: 1, patient: 'John Doe', date: '2023-08-15', time: '10:30 AM', status: 'Confirmed', condition: 'Heart Palpitations' },
  { id: 2, patient: 'Jane Smith', date: '2023-08-15', time: '11:15 AM', status: 'Confirmed', condition: 'High Blood Pressure' },
  { id: 3, patient: 'Robert Johnson', date: '2023-08-15', time: '2:00 PM', status: 'Confirmed', condition: 'Chest Pain' },
  { id: 4, patient: 'Emily Davis', date: '2023-08-16', time: '9:30 AM', status: 'Pending', condition: 'Post-Surgery Follow-up' },
];

const patients = [
  { id: 1, name: 'John Doe', age: 45, lastVisit: '2023-07-30', riskScore: 75 },
  { id: 2, name: 'Jane Smith', age: 62, lastVisit: '2023-08-01', riskScore: 42 },
  { id: 3, name: 'Robert Johnson', age: 58, lastVisit: '2023-07-15', riskScore: 68 },
  { id: 4, name: 'Emily Davis', age: 36, lastVisit: '2023-08-10', riskScore: 28 },
  { id: 5, name: 'Michael Brown', age: 51, lastVisit: '2023-07-22', riskScore: 55 },
];

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPatients: 0,
    appointmentsToday: 0,
    highRiskPatients: 0,
    pendingReviews: 0,
  });
  
  // Simulate fetching dashboard stats
  useEffect(() => {
    // In a real app, this would come from an API
    setTimeout(() => {
      setStats({
        totalPatients: 128,
        appointmentsToday: appointments.filter(a => 
          new Date(a.date).toDateString() === new Date().toDateString()
        ).length,
        highRiskPatients: patients.filter(p => p.riskScore > 60).length,
        pendingReviews: 7,
      });
    }, 1000);
  }, []);
  
  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Dr. {user?.name || 'User'}</span>
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'Doctor'}&background=random`} 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stat Card 1 */}
            <motion.div 
              className="bg-white overflow-hidden shadow rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Patients
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.totalPatients}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/patients" className="font-medium text-indigo-600 hover:text-indigo-500">
                    View all
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Stat Card 2 */}
            <motion.div 
              className="bg-white overflow-hidden shadow rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Appointments Today
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.appointmentsToday}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/appointments/manage" className="font-medium text-red-600 hover:text-red-500">
                    View schedule
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Stat Card 3 */}
            <motion.div 
              className="bg-white overflow-hidden shadow rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        High Risk Patients
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.highRiskPatients}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/high-risk" className="font-medium text-yellow-600 hover:text-yellow-500">
                    View list
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Stat Card 4 */}
            <motion.div 
              className="bg-white overflow-hidden shadow rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Reviews
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.pendingReviews}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link to="/reviews" className="font-medium text-green-600 hover:text-green-500">
                    Review patients
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Today's Appointments */}
          <motion.div 
            className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="md:flex md:items-center md:justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Today's Appointments</h2>
              <div className="mt-3 flex md:mt-0 md:ml-4">
                <Link to="/appointments/manage">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View All
                  </button>
                </Link>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Appointment
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Condition
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments
                    .filter(appointment => new Date(appointment.date).toDateString() === new Date().toDateString())
                    .map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://ui-avatars.com/api/?name=${appointment.patient}&background=random`}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.condition}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          {/* Patient Overview */}
          <motion.div 
            className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="md:flex md:items-center md:justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Patients</h2>
              <div className="mt-3 flex md:mt-0 md:ml-4">
                <Link to="/patients">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View All Patients
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Score
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`https://ui-avatars.com/api/?name=${patient.name}&background=random`}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.age}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{new Date(patient.lastVisit).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getRiskColor(patient.riskScore)}`}>
                          {patient.riskScore}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 