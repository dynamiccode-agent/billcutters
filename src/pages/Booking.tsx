import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Booking() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'info' | 'time' | 'confirm'>('info')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    challenge: '',
    date: '',
    time: ''
  })

  // Generate next 14 days for booking
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-AU', { weekday: 'short', month: 'short', day: 'numeric' })
        })
      }
    }
    return dates
  }

  const availableTimes = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('time')
  }

  const handleDateSelect = (date: string) => {
    setFormData({ ...formData, date })
  }

  const handleTimeSelect = (time: string) => {
    setFormData({ ...formData, time })
    setStep('confirm')
  }

  const handleConfirm = () => {
    // Here you would send the booking data to your backend
    console.log('Booking confirmed:', formData)
    alert('Thank you! Your consultation has been booked. We\'ll send you a confirmation email shortly.')
    navigate('/')
  }

  const availableDates = getAvailableDates()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your Free Consultation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule a confidential discussion with our expert advisors. No obligation, just honest guidance.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'info' ? 'text-primary-600' : step === 'time' || step === 'confirm' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'info' ? 'bg-primary-600 text-white' : step === 'time' || step === 'confirm' ? 'bg-green-600 text-white' : 'bg-gray-300 text-white'}`}>
                  {step === 'time' || step === 'confirm' ? '✓' : '1'}
                </div>
                <span className="font-medium">Your Details</span>
              </div>
              
              <div className="w-16 h-0.5 bg-gray-300"></div>
              
              <div className={`flex items-center gap-2 ${step === 'time' ? 'text-primary-600' : step === 'confirm' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'time' ? 'bg-primary-600 text-white' : step === 'confirm' ? 'bg-green-600 text-white' : 'bg-gray-300 text-white'}`}>
                  {step === 'confirm' ? '✓' : '2'}
                </div>
                <span className="font-medium">Select Time</span>
              </div>
              
              <div className="w-16 h-0.5 bg-gray-300"></div>
              
              <div className={`flex items-center gap-2 ${step === 'confirm' ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirm' ? 'bg-primary-600 text-white' : 'bg-gray-300 text-white'}`}>
                  3
                </div>
                <span className="font-medium">Confirm</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            {/* Step 1: Info */}
            {step === 'info' && (
              <form onSubmit={handleInfoSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none"
                      placeholder="04XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none"
                      placeholder="Your Company Pty Ltd"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">
                    What's your main challenge? *
                  </label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    required
                    rows={4}
                    value={formData.challenge}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none resize-none"
                    placeholder="Brief description of what you're facing..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Continue to Select Time
                </button>
              </form>
            )}

            {/* Step 2: Time Selection */}
            {step === 'time' && (
              <div className="space-y-6">
                <button
                  onClick={() => setStep('info')}
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </button>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Date</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableDates.map(({ date, display }) => (
                      <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.date === date
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium text-sm">{display}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.date && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select a Time</h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className="p-3 rounded-lg border-2 border-gray-200 hover:border-primary-600 hover:bg-primary-50 transition-all font-medium text-sm"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 'confirm' && (
              <div className="space-y-6">
                <button
                  onClick={() => setStep('time')}
                  className="text-primary-600 hover:text-primary-700 flex items-center gap-2 mb-4"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </button>

                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Your Booking</h3>
                  
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Name:</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span>{formData.phone}</span>
                    </div>
                    {formData.company && (
                      <div className="flex justify-between">
                        <span className="font-medium">Company:</span>
                        <span>{formData.company}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-primary-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Consultation:</span>
                        <div className="text-right">
                          <div className="font-semibold text-primary-700">
                            {new Date(formData.date).toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="text-sm">{formData.time} (AEST)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  <p className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You'll receive a confirmation email with calendar invite and video call link. All consultations are completely confidential.
                  </p>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg"
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
