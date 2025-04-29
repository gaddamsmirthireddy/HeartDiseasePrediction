import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../hooks/useAuth'
import { useUserRole } from '../hooks/useAuth'

interface Appointment {
  id: string
  patientName: string
  patientId: string
  doctorName: string
  doctorId: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  reason: string
  notes: string
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    patientName: 'John Smith',
    patientId: 'pat-001',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'doc-001',
    date: '2023-12-05',
    time: '10:00 AM',
    status: 'confirmed',
    reason: 'Heart palpitations and chest pain',
    notes: 'Patient reports episodes lasting 5-10 minutes, occurring 2-3 times per week.'
  },
  {
    id: 'apt-002',
    patientName: 'Emily Davis',
    patientId: 'pat-002',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'doc-001',
    date: '2023-12-06',
    time: '2:30 PM',
    status: 'pending',
    reason: 'Follow-up on recent heart test results',
    notes: ''
  },
  {
    id: 'apt-003',
    patientName: 'Michael Johnson',
    patientId: 'pat-003',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'doc-001',
    date: '2023-12-04',
    time: '9:15 AM',
    status: 'completed',
    reason: 'Annual cardiac checkup',
    notes: 'Patient is maintaining good heart health. Recommended to continue current medication.'
  },
  {
    id: 'apt-004',
    patientName: 'Jennifer Wilson',
    patientId: 'pat-004',
    doctorName: 'Dr. Michael Chen',
    doctorId: 'doc-002',
    date: '2023-12-07',
    time: '11:45 AM',
    status: 'confirmed',
    reason: 'Consultation for heart surgery options',
    notes: 'Patient has been referred from primary care for surgical evaluation.'
  },
  {
    id: 'apt-005',
    patientName: 'Robert Brown',
    patientId: 'pat-005',
    doctorName: 'Dr. Michael Chen',
    doctorId: 'doc-002',
    date: '2023-12-08',
    time: '3:00 PM',
    status: 'pending',
    reason: 'Chest pain after physical activity',
    notes: 'Patient reports symptoms during moderate exercise. Has family history of heart disease.'
  },
  {
    id: 'apt-006',
    patientName: 'David Martinez',
    patientId: 'pat-006',
    doctorName: 'Dr. Emily Rodriguez',
    doctorId: 'doc-003',
    date: '2023-12-05',
    time: '1:15 PM',
    status: 'cancelled',
    reason: 'Irregular heartbeat',
    notes: 'Patient requested to reschedule due to personal emergency.'
  }
]

export default function AppointmentManagement() {
  const { user } = useAuth()
  const { data: userRoleData } = useUserRole()
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [notes, setNotes] = useState('')
  
  // Determine if the user is a doctor or admin
  const userRole = userRoleData?.role || (user?.userType || '')
  const isDoctor = userRole === 'doctor'
  const isAdmin = userRole === 'admin'
  
  // If a doctor is logged in, only show their appointments
  const filteredAppointments = appointments.filter(appointment => {
    // Filter by doctor if the current user is a doctor
    if (isDoctor && user?.id) {
      if (appointment.doctorId !== user.id) {
        return false
      }
    }
    
    // Filter by status if not showing all
    if (filter !== 'all' && appointment.status !== filter) {
      return false
    }
    
    // Filter by search query (patient name, doctor name, or reason)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        appointment.patientName.toLowerCase().includes(query) ||
        appointment.doctorName.toLowerCase().includes(query) ||
        appointment.reason.toLowerCase().includes(query)
      )
    }
    
    return true
  })
  
  // Format date to more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
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
  
  // Handle updating appointment status
  const updateAppointmentStatus = (id: string, newStatus: 'confirmed' | 'cancelled' | 'completed') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ))
    
    if (selectedAppointment?.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus })
    }
  }
  
  // Handle saving notes for an appointment
  const saveNotes = () => {
    if (!selectedAppointment) return
    
    setAppointments(appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { ...appointment, notes } 
        : appointment
    ))
    
    setSelectedAppointment({ ...selectedAppointment, notes })
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Appointment Management</h1>
        <p className="text-gray-600">
          {isDoctor 
            ? 'Manage your patient appointments and schedules' 
            : 'Administer all doctor-patient appointments'
          }
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <CardTitle>Appointments</CardTitle>
                <div className="mt-2 md:mt-0 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  onClick={() => setFilter('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button 
                  variant={filter === 'pending' ? 'default' : 'outline'} 
                  onClick={() => setFilter('pending')}
                  size="sm"
                >
                  Pending
                </Button>
                <Button 
                  variant={filter === 'confirmed' ? 'default' : 'outline'} 
                  onClick={() => setFilter('confirmed')}
                  size="sm"
                >
                  Confirmed
                </Button>
                <Button 
                  variant={filter === 'completed' ? 'default' : 'outline'} 
                  onClick={() => setFilter('completed')}
                  size="sm"
                >
                  Completed
                </Button>
                <Button 
                  variant={filter === 'cancelled' ? 'default' : 'outline'} 
                  onClick={() => setFilter('cancelled')}
                  size="sm"
                >
                  Cancelled
                </Button>
              </div>
              
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No appointments found matching your criteria</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAppointment?.id === appointment.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedAppointment(appointment)
                        setNotes(appointment.notes)
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div>Doctor: {appointment.doctorName}</div>
                        <div>{formatDate(appointment.date)} at {appointment.time}</div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Reason:</span> {appointment.reason}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAppointment ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">{selectedAppointment.patientName}</h3>
                    <div className="text-sm text-gray-600 mb-1">
                      Appointment with {selectedAppointment.doctorName}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {formatDate(selectedAppointment.date)} at {selectedAppointment.time}
                    </div>
                    
                    <div className="mb-4">
                      <span className="font-medium">Status: </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                        {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <span className="font-medium">Reason for Visit:</span>
                      <p className="mt-1 text-gray-600">{selectedAppointment.reason}</p>
                    </div>
                    
                    <div className="mb-6">
                      <label className="font-medium block mb-1">Notes:</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                        placeholder="Add appointment notes here..."
                      ></textarea>
                      <Button onClick={saveNotes} size="sm" className="mt-2">
                        Save Notes
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedAppointment.status === 'pending' && (
                        <Button 
                          onClick={() => updateAppointmentStatus(selectedAppointment.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Confirm
                        </Button>
                      )}
                      
                      {(selectedAppointment.status === 'pending' || selectedAppointment.status === 'confirmed') && (
                        <Button 
                          onClick={() => updateAppointmentStatus(selectedAppointment.id, 'cancelled')}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Cancel
                        </Button>
                      )}
                      
                      {selectedAppointment.status === 'confirmed' && (
                        <Button 
                          onClick={() => updateAppointmentStatus(selectedAppointment.id, 'completed')}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Mark Completed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Select an appointment to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 