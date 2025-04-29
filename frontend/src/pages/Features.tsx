import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useNavigate } from 'react-router-dom'

export default function Features() {
  const navigate = useNavigate()
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Heart Health Features
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Discover all the tools and resources available to help you monitor and improve your heart health
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Heart Disease Prediction</CardTitle>
            <CardDescription>
              Early detection is key to better outcomes
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500">
              Our AI-powered prediction tool uses multiple health parameters to assess your heart disease risk. 
              Get personalized results in minutes.
            </p>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button onClick={() => navigate('/predictor')} className="w-full">
              Try Predictor
            </Button>
          </div>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Doctor Consultations</CardTitle>
            <CardDescription>
              Connect with cardiology specialists
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500">
              Schedule virtual or in-person appointments with qualified heart specialists. 
              Get expert advice tailored to your health situation.
            </p>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button onClick={() => navigate('/appointments')} className="w-full">
              Book Appointment
            </Button>
          </div>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Hospital Finder</CardTitle>
            <CardDescription>
              Locate cardiac care facilities near you
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500">
              Find hospitals and clinics specialized in cardiac care in your area.
              Filter by services, ratings, and distance.
            </p>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button onClick={() => navigate('/hospitals')} className="w-full">
              Find Hospitals
            </Button>
          </div>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Health Tracking</CardTitle>
            <CardDescription>
              Monitor your heart health metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500">
              Track blood pressure, cholesterol, heart rate, and other vital metrics over time.
              Visualize your progress with intuitive charts.
            </p>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button onClick={() => navigate('/patient/dashboard')} className="w-full">
              View Dashboard
            </Button>
          </div>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI Health Assistant</CardTitle>
            <CardDescription>
              Get answers to your heart health questions
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500">
              Our AI-powered chatbot provides immediate responses to common heart health questions.
              Available 24/7 for your convenience.
            </p>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button className="w-full">
              Start Chat
            </Button>
          </div>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Education Resources</CardTitle>
            <CardDescription>
              Learn about heart health
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-500">
              Access a rich library of articles, videos, and guides about heart disease prevention,
              treatment options, and lifestyle modifications.
            </p>
          </CardContent>
          <div className="p-6 pt-0 mt-auto">
            <Button onClick={() => navigate('/how-it-works')} className="w-full">
              Explore Resources
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 