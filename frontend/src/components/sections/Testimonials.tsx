import { useState } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'

interface Testimonial {
  id: number
  name: string
  avatar: string
  role: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    role: 'Patient',
    content: 'The heart disease predictor gave me an early warning that helped me make critical lifestyle changes. My doctor was impressed with the accuracy of the assessment, and we were able to address potential issues before they became serious.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    role: 'Patient',
    content: 'I was skeptical at first, but the prediction tool accurately identified my risk factors. The appointment scheduling was seamless, and I was able to connect with a specialist who helped me develop a heart-healthy plan.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    role: 'Cardiologist',
    content: 'As a cardiologist, I appreciate the way this platform bridges the gap between patients and specialists. The prediction algorithm is based on solid clinical research, and the telemedicine features make follow-ups much more convenient for my patients.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    role: 'Patient',
    content: 'After using the heart disease predictor, I was able to take my results to my doctor who confirmed the findings. This early intervention potentially saved my life. The hospital finder also helped me locate a cardiac specialist close to home.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Robert Williams',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    role: 'Patient',
    content: 'The AI chatbot answered my questions about heart health day and night. It was like having a medical professional on standby. When I needed more personalized care, booking an appointment was just a few clicks away.',
    rating: 4,
  },
  {
    id: 6,
    name: 'Dr. Jennifer Lee',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    role: 'Cardiologist',
    content: 'The platform makes patient education much more accessible. I often refer my patients to the resources here, and the prediction tool helps them visualize their risk factors in a way that motivates positive change.',
    rating: 5,
  },
]

export function Testimonials() {
  const [activeTestimonials, setActiveTestimonials] = useState<Testimonial[]>(testimonials.slice(0, 3))
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(testimonials.length / 3)

  const handleNextPage = () => {
    const nextPage = (currentPage + 1) % totalPages
    setCurrentPage(nextPage)
    setActiveTestimonials(testimonials.slice(nextPage * 3, nextPage * 3 + 3))
  }

  const handlePrevPage = () => {
    const prevPage = (currentPage - 1 + totalPages) % totalPages
    setCurrentPage(prevPage)
    setActiveTestimonials(testimonials.slice(prevPage * 3, prevPage * 3 + 3))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          What People Say About Our Platform
        </h2>
        <p className="text-xl text-gray-500">
          Real stories from patients and doctors who use our heart health services
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {activeTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full flex flex-col">
            <CardHeader className="pb-0">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src={testimonial.avatar || '/images/avatar-placeholder.jpg'}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/avatar-placeholder.jpg'
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span 
                    key={index} 
                    className={`text-lg ${index < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrevPage}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Previous testimonials"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex items-center">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index)
                  setActiveTestimonials(testimonials.slice(index * 3, index * 3 + 3))
                }}
                className={`mx-1 h-2 w-2 rounded-full ${
                  currentPage === index ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Next testimonials"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
} 