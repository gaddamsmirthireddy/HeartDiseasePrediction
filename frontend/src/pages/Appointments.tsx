import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface Doctor {
  id: string
  name: string
  specialty: string
  availability: string[]
  rating: number
  image: string
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    availability: ['Monday', 'Wednesday', 'Friday'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiac Surgeon',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Interventional Cardiologist',
    availability: ['Monday', 'Tuesday', 'Thursday'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Electrophysiologist',
    availability: ['Wednesday', 'Friday', 'Saturday'],
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
]

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const handleBookAppointment = (doctor: Doctor) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/appointments' } })
      return
    }
    setSelectedDoctor(doctor)
  }

  const confirmAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time')
      return
    }
    
    // In a real app, this would call an API to book the appointment
    alert(`Appointment booked with ${selectedDoctor?.name} on ${selectedDate} at ${selectedTime}`)
    setSelectedDoctor(null)
    setSelectedDate('')
    setSelectedTime('')
  }

  const cancelBooking = () => {
    setSelectedDoctor(null)
    setSelectedDate('')
    setSelectedTime('')
  }
  
  // Generate available dates (next 14 days)
  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip unavailable days for the selected doctor
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      if (selectedDoctor && !selectedDoctor.availability.includes(dayName)) {
        continue
      }
      
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      
      dates.push(formattedDate)
    }
    
    return dates
  }
  
  // Generate time slots
  const generateTimeSlots = () => {
    const times = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`)
      if (hour !== endHour) {
        times.push(`${hour}:30 ${hour < 12 ? 'AM' : 'PM'}`)
      }
    }
    
    return times
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Book an Appointment with a Heart Specialist
        </h1>
        <p className="text-xl text-gray-500">
          Connect with top cardiologists for your heart health needs
        </p>
      </div>
      
      {selectedDoctor ? (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Book Appointment with {selectedDoctor.name}</CardTitle>
              <CardDescription>{selectedDoctor.specialty}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">Select a date</option>
                    {generateDates().map((date, index) => (
                      <option key={index} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Select Time</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    disabled={!selectedDate}
                  >
                    <option value="">Select a time</option>
                    {generateTimeSlots().map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={cancelBooking}>Cancel</Button>
                  <Button onClick={confirmAppointment}>Confirm Appointment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={doctor.image || '/images/doctor-placeholder.jpg'} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/doctor-placeholder.jpg'
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{doctor.rating} / 5</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Available on: {doctor.availability.join(', ')}
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleBookAppointment(doctor)}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 