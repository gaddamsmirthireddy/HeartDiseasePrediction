import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export function DoctorHome() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Welcome to Heart Health Portal
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Your dedicated platform for managing patient care and cardiovascular health consultations.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={() => navigate('/appointments/manage')} size="lg">
                  Manage Appointments
                </Button>
                <Button onClick={() => navigate('/doctor/dashboard')} variant="outline" size="lg">
                  View Dashboard
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                alt="Doctor Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={500}
                height={310}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Patient Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  View and manage your upcoming and past patient consultations.
                </p>
                <Button className="mt-4" variant="outline" onClick={() => navigate('/appointments/manage')}>
                  View Consultations
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Access patient medical records and heart health history.
                </p>
                <Button className="mt-4" variant="outline" onClick={() => navigate('/doctor/dashboard')}>
                  Access Records
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Chat with Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Communicate with your patients through our secure messaging system.
                </p>
                <Button className="mt-4" variant="outline">
                  Open Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 