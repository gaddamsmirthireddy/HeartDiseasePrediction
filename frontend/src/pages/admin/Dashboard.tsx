import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { useAuth } from '../../hooks/useAuth'

// Mock data for dashboard statistics
const mockStatistics = {
  totalUsers: 1425,
  totalDoctors: 87,
  totalPatients: 1338,
  activeAppointments: 245,
  completedAppointments: 3891,
  registrationsThisMonth: 128,
  appointmentsThisMonth: 412,
  predictionsThisMonth: 867
}

// Mock data for recent users
const recentUsers = [
  { id: 'usr-001', name: 'John Smith', email: 'john.smith@example.com', role: 'patient', registeredAt: '2023-11-28' },
  { id: 'usr-002', name: 'Dr. Sarah Johnson', email: 'sarah.j@example.com', role: 'doctor', registeredAt: '2023-11-27' },
  { id: 'usr-003', name: 'Emily Davis', email: 'emily.d@example.com', role: 'patient', registeredAt: '2023-11-25' },
  { id: 'usr-004', name: 'Michael Chen', email: 'michael.c@example.com', role: 'patient', registeredAt: '2023-11-24' },
  { id: 'usr-005', name: 'Dr. James Wilson', email: 'james.w@example.com', role: 'doctor', registeredAt: '2023-11-23' }
]

// Mock data for recent appointments
const recentAppointments = [
  { id: 'apt-001', patient: 'John Smith', doctor: 'Dr. Sarah Johnson', date: '2023-12-05', time: '10:00 AM', status: 'confirmed' },
  { id: 'apt-002', patient: 'Emily Davis', doctor: 'Dr. Sarah Johnson', date: '2023-12-06', time: '2:30 PM', status: 'pending' },
  { id: 'apt-003', patient: 'Michael Johnson', doctor: 'Dr. Sarah Johnson', date: '2023-12-04', time: '9:15 AM', status: 'completed' },
  { id: 'apt-004', patient: 'Jennifer Wilson', doctor: 'Dr. Michael Chen', date: '2023-12-07', time: '11:45 AM', status: 'confirmed' },
  { id: 'apt-005', patient: 'Robert Brown', doctor: 'Dr. Michael Chen', date: '2023-12-08', time: '3:00 PM', status: 'pending' }
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'appointments' | 'predictions'>('overview')
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  // Get status color for visual indication
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-md p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your platform</p>
          </div>
          
          <nav className="space-y-1">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('overview')}
            >
              Dashboard
            </Button>
            <Button 
              variant={activeTab === 'users' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('users')}
            >
              User Management
            </Button>
            <Button 
              variant={activeTab === 'appointments' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => navigate('/appointments/manage')}
            >
              Appointments
            </Button>
            <Button 
              variant={activeTab === 'predictions' ? 'default' : 'ghost'} 
              className="w-full justify-start" 
              onClick={() => setActiveTab('predictions')}
            >
              Predictions
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-12" 
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'appointments' && 'Appointment Management'}
                {activeTab === 'predictions' && 'Predictions Analytics'}
              </h2>
              <div className="text-sm text-gray-600">
                Welcome, {user?.name || 'Admin'}
              </div>
            </div>
          </header>
          
          {/* Dashboard overview */}
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockStatistics.totalUsers}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      +{mockStatistics.registrationsThisMonth} this month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Doctors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockStatistics.totalDoctors}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((mockStatistics.totalDoctors / mockStatistics.totalUsers) * 100)}% of users
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Active Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockStatistics.activeAppointments}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      {mockStatistics.appointmentsThisMonth} scheduled this month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Predictions Made</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{mockStatistics.predictionsThisMonth}</div>
                    <p className="text-xs text-gray-500 mt-1">
                      This month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'doctor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(user.registeredAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setActiveTab('users')}
                    >
                      View All Users
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div>
                            <div className="font-medium">{appointment.patient}</div>
                            <div className="text-sm text-gray-500">with {appointment.doctor}</div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(appointment.date)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => navigate('/appointments/manage')}
                    >
                      Manage Appointments
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          
          {/* User management tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">User Management</h3>
                    <p className="text-sm text-gray-500">Manage platform users</p>
                  </div>
                  <Button>Add New User</Button>
                </div>
                
                <div className="flex justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">All Users</Button>
                    <Button variant="outline" size="sm">Doctors</Button>
                    <Button variant="outline" size="sm">Patients</Button>
                    <Button variant="outline" size="sm">Admins</Button>
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-3 py-1 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Registered
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'doctor' ? 'bg-blue-100 text-blue-800' : 
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(user.registeredAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing 1 to 5 of {mockStatistics.totalUsers} users
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Predictions analytics tab */}
          {activeTab === 'predictions' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Prediction Analytics</h3>
                <p className="text-gray-500">
                  Monitor usage and accuracy of heart disease predictions
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Predictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12,547</div>
                    <p className="text-xs text-gray-500 mt-1">
                      All time
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Positive Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3,128</div>
                    <p className="text-xs text-gray-500 mt-1">
                      25% of all predictions
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Model Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">93.7%</div>
                    <p className="text-xs text-gray-500 mt-1">
                      Based on verified outcomes
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-gray-500 mt-4 text-center">
                Detailed charts and analytics would be displayed here in a real implementation
              </p>
              
              <div className="mt-8 text-center">
                <Button>Generate Detailed Report</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 