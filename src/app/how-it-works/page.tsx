import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-uci-navy mb-6">
              How <span className="text-uci-blue">Zotpool</span> Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your complete guide to sustainable commuting at UCI
            </p>
          </div>

          {/* Step-by-step process */}
          <div className="max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up with your @uci.edu email address for instant verification and access to the UCI carpooling community.',
                icon: '📧',
                details: [
                  'Use your official UCI email (@uci.edu)',
                  'Complete your profile with year, major, and preferences',
                  'Add your photo to help others recognize you',
                  'Verify your student/staff status automatically'
                ]
              },
              {
                step: '02',
                title: 'Set Your Preferences',
                description: 'Tell us about your commuting needs, schedule, and preferences for the best matching experience.',
                icon: '⚙️',
                details: [
                  'Set your class schedule or work hours',
                  'Choose your preferred routes and pickup points',
                  'Select music and conversation preferences',
                  'Configure safety and gender preferences if desired'
                ]
              },
              {
                step: '03',
                title: 'Find or Offer Rides',
                description: 'Search for available rides or post your own. Our AI algorithm will help you find the perfect matches.',
                icon: '🔍',
                details: [
                  'Browse rides that match your schedule',
                  'Post your own ride if you\'re driving',
                  'See compatibility scores for each match',
                  'Filter by route, time, and preferences'
                ]
              },
              {
                step: '04',
                title: 'Connect & Coordinate',
                description: 'Message your matches through our secure platform to coordinate pickup details and get to know each other.',
                icon: '💬',
                details: [
                  'Chat with potential ride partners safely',
                  'Share pickup and dropoff locations',
                  'Coordinate exact timing and meeting points',
                  'Exchange contact information when ready'
                ]
              },
              {
                step: '05',
                title: 'Ride Together',
                description: 'Meet your ride partner, enjoy your commute, and help reduce traffic and emissions at UCI.',
                icon: '🚗',
                details: [
                  'Meet at the agreed location and time',
                  'Enjoy a more social and eco-friendly commute',
                  'Split gas costs if you\'ve agreed to do so',
                  'Build connections with fellow UCI community members'
                ]
              },
              {
                step: '06',
                title: 'Rate & Review',
                description: 'After your ride, rate your experience to help maintain a safe and reliable community.',
                icon: '⭐',
                details: [
                  'Rate your ride partner on punctuality and safety',
                  'Leave a brief review of your experience',
                  'Build your reputation as a reliable community member',
                  'Help others make informed decisions'
                ]
              }
            ].map((step, index) => (
              <div key={index} className={`mb-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex lg:items-center lg:gap-12`}>
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 uci-gradient rounded-2xl flex items-center justify-center mr-4">
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      <div>
                        <div className="text-sm text-uci-blue font-semibold">STEP {step.step}</div>
                        <h3 className="text-2xl font-bold text-uci-navy">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-uci-gold mr-3 mt-1">•</span>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                  <div className="relative">
                    <div className="w-32 h-32 uci-gradient rounded-full flex items-center justify-center mx-auto text-6xl shadow-2xl">
                      {step.icon}
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-uci-gold rounded-full flex items-center justify-center text-uci-navy font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Safety & Features */}
          <div className="mt-24 bg-white rounded-2xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-uci-navy mb-4">Safety & Features</h2>
              <p className="text-gray-600">Your safety and security are our top priorities</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🔒',
                  title: 'UCI Verification',
                  description: 'Only verified UCI community members can access the platform'
                },
                {
                  icon: '📱',
                  title: 'Secure Messaging',
                  description: 'Communicate safely through our encrypted messaging system'
                },
                {
                  icon: '⭐',
                  title: 'Rating System',
                  description: 'Community-driven ratings help maintain trust and safety'
                },
                {
                  icon: '🛡️',
                  title: 'Report System',
                  description: 'Easy reporting tools for any safety concerns'
                },
                {
                  icon: '🤖',
                  title: 'AI Matching',
                  description: 'Smart algorithm matches compatible riders for better experiences'
                },
                {
                  icon: '🌱',
                  title: 'Eco Impact',
                  description: 'Track your environmental impact and CO₂ savings'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 uci-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-uci-navy mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-uci-navy mb-6">Ready to Start?</h2>
            <p className="text-xl text-gray-600 mb-8">Join the UCI carpooling community today!</p>
            <Link href="/auth/signin">
              <button className="btn-primary text-lg px-12 py-4 shadow-xl">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}