'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

interface Ride {
  id: string
  startLocation: string
  endLocation: string
  departureTime: string
  availableSeats: number
  suggestedFare: number | null
  notes: string | null
  driver: {
    id: string
    name: string
    driverRating: number | null
    totalRides: number
    userType: string
    year: string | null
    major: string | null
  }
  vehicle: {
    make: string
    model: string
    color: string
    capacity: number
  }
  compatibilityScore: number
}

export default function FindRide() {
  const { data: session, status } = useSession()
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    time: ''
  })

  const searchRides = async () => {
    if (!session) return

    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchParams.from) params.append('from', searchParams.from)
      if (searchParams.to) params.append('to', searchParams.to)
      if (searchParams.date) params.append('date', searchParams.date)

      const response = await fetch(`/api/rides?${params}`)
      const data = await response.json()

      if (response.ok) {
        setRides(data)
      } else {
        console.error('Error fetching rides:', data.error)
      }
    } catch (error) {
      console.error('Error fetching rides:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      searchRides()
    }
  }, [session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 uci-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <span className="text-2xl">🐻‍❄️</span>
          </div>
          <p className="text-gray-600">Loading rides...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="w-24 h-24 uci-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold text-uci-navy mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-8">You need to sign in with your UCI email to find rides.</p>
            <Link href="/auth/signin">
              <button className="btn-primary">Sign In with UCI Email</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-uci-navy mb-6">
              Find Your Perfect <span className="text-uci-blue">Ride</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search for rides that match your schedule and route preferences
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                <input
                  type="text"
                  placeholder="Enter starting location..."
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                <input
                  type="text"
                  placeholder="Enter destination..."
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={searchParams.time}
                  onChange={(e) => setSearchParams({...searchParams, time: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={searchRides}
                disabled={loading}
                className="btn-primary text-lg px-12 py-4 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-uci-navy mr-2"></div>
                    Searching...
                  </span>
                ) : (
                  '🔍 Search Rides'
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-w-4xl mx-auto">
            {rides.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-uci-navy">Available Rides ({rides.length})</h2>
                {rides.map((ride) => (
                  <div key={ride.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="text-lg font-semibold text-gray-900">
                            {ride.startLocation} → {ride.endLocation}
                          </div>
                          <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {Math.round(ride.compatibilityScore * 100)}% match
                          </div>
                        </div>
                        <div className="text-gray-600 mb-2">
                          {new Date(ride.departureTime).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-4">
                            🚗 {ride.vehicle.color} {ride.vehicle.make} {ride.vehicle.model}
                          </span>
                          <span className="mr-4">
                            👥 {ride.availableSeats} seats available
                          </span>
                          {ride.suggestedFare && (
                            <span>💰 ${ride.suggestedFare}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-uci-blue rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">
                            {ride.driver.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{ride.driver.name}</div>
                          <div className="text-sm text-gray-600">
                            {ride.driver.userType === 'STUDENT' ?
                              `${ride.driver.year} • ${ride.driver.major}` :
                              ride.driver.userType
                            } • {ride.driver.totalRides} rides
                            {ride.driver.driverRating && (
                              <span> • ⭐ {ride.driver.driverRating.toFixed(1)}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-uci-blue text-uci-blue rounded-lg hover:bg-uci-blue hover:text-white transition-colors">
                          💬 Message
                        </button>
                        <button className="btn-primary px-6 py-2">
                          🎯 Request Ride
                        </button>
                      </div>
                    </div>

                    {ride.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Driver notes:</strong> {ride.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-white rounded-2xl p-12">
                <div className="w-24 h-24 uci-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-uci-navy mb-4">
                  {loading ? 'Searching for rides...' : 'No rides found'}
                </h3>
                <p className="text-gray-600 mb-8">
                  {loading
                    ? 'We\'re looking for the perfect matches for you!'
                    : 'Try adjusting your search criteria or check back later for new rides.'
                  }
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={searchRides}
                    className="btn-secondary"
                  >
                    🔄 Refresh Search
                  </button>
                  <Link href="/offer-ride">
                    <button className="btn-primary">
                      🚗 Offer a Ride Instead
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}