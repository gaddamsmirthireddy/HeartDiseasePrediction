import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

interface Hospital {
  id: string
  name: string
  address: string
  city: string
  state: string
  specialties: string[]
  rating: number
  distance: number
  image: string
}

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Heart & Vascular Institute',
    address: '123 Main Street',
    city: 'Boston',
    state: 'MA',
    specialties: ['Cardiology', 'Cardiac Surgery', 'Vascular Medicine'],
    rating: 4.7,
    distance: 3.2,
    image: 'https://images.unsplash.com/photo-1587351021355-a34da10c85bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '2',
    name: 'Cardiac Care Center',
    address: '456 Oak Avenue',
    city: 'Cambridge',
    state: 'MA',
    specialties: ['Cardiology', 'Electrophysiology', 'Cardiac Rehabilitation'],
    rating: 4.5,
    distance: 5.8,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '3',
    name: 'Metropolitan Heart Hospital',
    address: '789 Elm Street',
    city: 'Somerville',
    state: 'MA',
    specialties: ['Interventional Cardiology', 'Pediatric Cardiology', 'Heart Failure'],
    rating: 4.9,
    distance: 7.4,
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '4',
    name: 'University Medical Center',
    address: '101 University Drive',
    city: 'Boston',
    state: 'MA',
    specialties: ['Cardiology', 'Cardiac Surgery', 'Transplant', 'Research'],
    rating: 4.8,
    distance: 2.9,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80'
  },
  {
    id: '5',
    name: 'Community Heart Clinic',
    address: '202 Pine Street',
    city: 'Brookline',
    state: 'MA',
    specialties: ['Cardiology', 'Preventive Cardiology', 'Cardiac Rehabilitation'],
    rating: 4.3,
    distance: 8.6,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '6',
    name: 'Regional Cardiovascular Center',
    address: '303 Cedar Road',
    city: 'Medford',
    state: 'MA',
    specialties: ['Cardiology', 'Vascular Surgery', 'Cardiac Imaging'],
    rating: 4.6,
    distance: 10.2,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80'
  },
]

export default function Hospitals() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('')
  
  // Get all unique specialties from the hospitals
  const allSpecialties = Array.from(
    new Set(mockHospitals.flatMap(hospital => hospital.specialties))
  ).sort()
  
  // Filter and sort the hospitals
  const filteredAndSortedHospitals = mockHospitals
    .filter(hospital => {
      // Filter by search query
      const matchesSearch = 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Filter by specialty
      const matchesSpecialty = 
        !selectedSpecialty || hospital.specialties.includes(selectedSpecialty)
      
      return matchesSearch && matchesSpecialty
    })
    .sort((a, b) => {
      // Sort by selected criterion
      if (sortBy === 'distance') {
        return a.distance - b.distance
      } else {
        return b.rating - a.rating
      }
    })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          Find Cardiac Care Facilities
        </h1>
        <p className="text-xl text-gray-500">
          Locate hospitals and clinics specializing in heart health near you
        </p>
      </div>
      
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Specialty</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All Specialties</option>
              {allSpecialties.map((specialty) => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'distance' ? 'default' : 'outline'}
                onClick={() => setSortBy('distance')}
                className="flex-1"
              >
                Nearest
              </Button>
              <Button
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                onClick={() => setSortBy('rating')}
                className="flex-1"
              >
                Highest Rated
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {filteredAndSortedHospitals.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No hospitals found matching your criteria</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedHospitals.map((hospital) => (
            <Card key={hospital.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={hospital.image || '/images/hospital-placeholder.jpg'} 
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/hospital-placeholder.jpg'
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle>{hospital.name}</CardTitle>
                <CardDescription>
                  {hospital.address}, {hospital.city}, {hospital.state}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{hospital.rating} / 5</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {hospital.distance} miles away
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">Specialties:</span>{' '}
                    {hospital.specialties.join(', ')}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    Get Directions
                  </Button>
                  <Button className="flex-1">
                    More Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 