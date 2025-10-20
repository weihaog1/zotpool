'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 100, 164, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255, 210, 0, 0.3) 0%, transparent 50%)`
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Floating Mascot */}
            <div className={`inline-block mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-24 h-24 lg:w-32 lg:h-32 uci-gradient rounded-3xl flex items-center justify-center float-animation pulse-glow mx-auto">
                <span className="text-4xl lg:text-5xl">🐻‍❄️</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-uci-blue to-uci-light-blue bg-clip-text text-transparent">
                  Zotpool
                </span>
              </h1>
              <div className="w-24 h-2 uci-gradient-gold rounded-full mx-auto mb-8"></div>
            </div>

            {/* Subtitle */}
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <p className="text-xl lg:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
                The UCI carpooling platform that connects students and staff for{' '}
                <span className="text-uci-blue font-semibold">sustainable</span>,{' '}
                <span className="text-uci-blue font-semibold">smart commuting</span> through{' '}
                <span className="text-uci-blue font-semibold">AI-powered ride matching</span>.
              </p>
              <p className="text-lg text-gray-500 mb-12">
                🌱 Join the sustainable commuting revolution at UCI
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link href="/find-ride">
                  <button className="btn-primary text-lg px-12 py-4 ripple shadow-xl">
                    <span className="flex items-center space-x-2">
                      <span>🔍</span>
                      <span>Find a Ride</span>
                    </span>
                  </button>
                </Link>
                <Link href="/offer-ride">
                  <button className="btn-secondary text-lg px-12 py-4 ripple shadow-xl bg-white border-uci-blue text-uci-blue">
                    <span className="flex items-center space-x-2">
                      <span>🚗</span>
                      <span>Offer a Ride</span>
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-uci-blue mb-2">10K+</div>
                  <div className="text-gray-600">UCI Community Members</div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-uci-blue mb-2">5K+</div>
                  <div className="text-gray-600">Successful Rides</div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-uci-blue mb-2">2.5M+</div>
                  <div className="text-gray-600">Miles of CO₂ Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-uci-blue rounded-full flex justify-center">
            <div className="w-1 h-3 bg-uci-blue rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-uci-navy mb-6">
              Why Choose <span className="text-uci-blue">Zotpool</span>?
            </h2>
            <div className="w-20 h-1 uci-gradient rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of university commuting with our AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: '🎯',
                title: 'AI-Powered Matching',
                description: 'Smart algorithm matches you with compatible riders based on schedule, route, and preferences.',
                delay: 'delay-100'
              },
              {
                icon: '🔒',
                title: 'UCI Verified',
                description: 'Exclusive to UCI community with @uci.edu email verification for safety and security.',
                delay: 'delay-200'
              },
              {
                icon: '🌱',
                title: 'Eco-Friendly',
                description: 'Reduce your carbon footprint while saving money on gas and parking around campus.',
                delay: 'delay-300'
              },
              {
                icon: '⚡',
                title: 'Instant Connect',
                description: 'Real-time matching and messaging to connect with riders instantly.',
                delay: 'delay-400'
              }
            ].map((feature, index) => (
              <div key={index} className={`feature-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 fade-in-up ${feature.delay}`}>
                <div className="w-16 h-16 uci-gradient rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-uci-navy">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-uci-navy mb-6">
              How It <span className="text-uci-blue">Works</span>
            </h2>
            <div className="w-20 h-1 uci-gradient rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Sign Up with UCI Email',
                description: 'Create your account using your @uci.edu email address for instant verification.',
                icon: '📧'
              },
              {
                step: '02',
                title: 'Find or Offer Rides',
                description: 'Search for rides or post your own. Our AI matches you with compatible riders.',
                icon: '🔍'
              },
              {
                step: '03',
                title: 'Connect & Ride',
                description: 'Message your matches, coordinate pickup details, and enjoy your sustainable commute!',
                icon: '🚗'
              }
            ].map((step, index) => (
              <div key={index} className="text-center fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="relative mb-8">
                  <div className="w-20 h-20 uci-gradient rounded-full flex items-center justify-center mx-auto text-3xl shadow-xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-uci-gold rounded-full flex items-center justify-center text-uci-navy font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-uci-navy">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/auth/signin">
              <button className="btn-primary text-lg px-12 py-4 shadow-xl">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-uci-navy text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 uci-gradient rounded-xl flex items-center justify-center">
                  <span className="text-xl">🐻‍❄️</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">Zotpool</div>
                  <div className="text-sm text-gray-300">UCI Carpooling Platform</div>
                </div>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Connecting the UCI community through sustainable, smart commuting solutions.
              </p>
              <div className="text-sm text-gray-400">
                ZOT ZOT! 🐻‍❄️⚡
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/find-ride" className="block text-gray-300 hover:text-white transition-colors">Find a Ride</Link>
                <Link href="/offer-ride" className="block text-gray-300 hover:text-white transition-colors">Offer a Ride</Link>
                <Link href="/how-it-works" className="block text-gray-300 hover:text-white transition-colors">How It Works</Link>
                <Link href="/auth/signin" className="block text-gray-300 hover:text-white transition-colors">Sign In</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Safety Guidelines</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Report Issue</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Zotpool - UCI Carpooling Platform. Built with 💙 for the UCI community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}