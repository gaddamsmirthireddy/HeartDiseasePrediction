import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }
    
    // Mock API call
    setTimeout(() => {
      // In a real app, this would be an API call
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 1500)
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
            Contact Us
          </h1>
          <p className="text-xl text-gray-500">
            Have questions or feedback? We'd love to hear from you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Our team is here to answer your questions about heart health, the platform, 
              or any other inquiries you might have.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+91 7569084143</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">smirthireddy@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    Hyderabad, Telangana<br />
                    India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-2">Office Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-16 w-16 text-green-500 mx-auto mb-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
                    
                    {error && (
                      <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                        {error}
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Please select</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="appointment">Appointment Issue</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        ></textarea>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 