'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

interface DashboardData {
  user: {
    name: string
    email: string
    driverRating: number | null
    totalRides: number
  }
  stats: {
    totalRidesAsDriver: number
    totalRidesAsPassenger: number
    totalRides: number
    driverRating: number
    pendingRequestsCount: number
  }
  upcomingRides: {
    asDriver: any[]
    asPassenger: any[]
  }
  pendingRequests: any[]
  recentActivity: any[]
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      if (response.ok) {
        const data = await response.json()
        setDashboardData(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 uci-gradient rounded-full flex items-center justify-center mx-auto mb-4 float-animation">
            <span className="text-2xl">🐻‍❄️</span>
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
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
            <p className="text-gray-600 mb-8">You need to sign in to view your dashboard.</p>
            <Link href="/auth/signin">
              <button className="btn-primary glow-button">Sign In with UCI Email</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const allUpcoming = [
    ...((dashboardData?.upcomingRides.asDriver || []).map((ride: any) => ({ ...ride, type: 'driver' }))),
    ...((dashboardData?.upcomingRides.asPassenger || []).map((ride: any) => ({ ...ride, type: 'passenger' })))
  ].sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime())

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 particle-bg">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-up">
            <h1 className="text-5xl font-bold text-uci-navy mb-6">
              Your <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your rides, view your stats, and connect with the UCI community
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover-lift card-reveal">
                <div className="text-3xl font-bold gradient-text mb-2">
                  {dashboardData?.stats.totalRides || 0}
                </div>
                <div className="text-gray-600 font-medium">Total Rides</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover-lift card-reveal delay-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {dashboardData?.stats.totalRidesAsPassenger || 0}
                </div>
                <div className="text-gray-600 font-medium">As Passenger</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover-lift card-reveal delay-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {dashboardData?.stats.totalRidesAsDriver || 0}
                </div>
                <div className="text-gray-600 font-medium">As Driver</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover-lift card-reveal delay-300">
                <div className="text-3xl font-bold text-uci-gold mb-2">
                  {dashboardData?.stats.driverRating ? dashboardData.stats.driverRating.toFixed(1) : 'N/A'}
                </div>
                <div className="text-gray-600 font-medium">Rating</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upcoming Rides */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg hover-lift">
                <h2 className="text-2xl font-bold text-uci-navy mb-6">Upcoming Rides</h2>
                <div className="space-y-4">
                  {allUpcoming.length > 0 ? (
                    allUpcoming.map((ride: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-uci-blue transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {ride.startLocation} → {ride.endLocation}
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(ride.departureTime).toLocaleString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ride.status === 'CONFIRMED' || ride.requestStatus === 'CONFIRMED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ride.status === 'CONFIRMED' || ride.requestStatus === 'CONFIRMED' ? 'Confirmed' : 'Pending'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          {ride.type === 'driver' ? (
                            <><span>🚗</span> Your ride • {ride.passengers?.filter((p: any) => p.status === 'CONFIRMED').length || 0} passenger(s)</>
                          ) : (
                            <><span>👤</span> Riding with {ride.driver?.name}</>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📭</span>
                      </div>
                      <p className="text-gray-600 mb-4">No upcoming rides yet</p>
                      <Link href="/find-ride">
                        <button className="btn-primary glow-button">Find a Ride</button>
                      </Link>
                    </div>
                  )}
                </div>

                {allUpcoming.length > 0 && (
                  <Link href="/find-ride">
                    <button className="w-full mt-6 py-3 border-2 border-uci-blue text-uci-blue rounded-xl hover:bg-uci-blue hover:text-white transition-colors">
                      Find More Rides
                    </button>
                  </Link>
                )}
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                  <h3 className="text-lg font-bold text-uci-navy mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/find-ride">
                      <button className="w-full btn-primary py-3 glow-button">
                        🔍 Find a Ride
                      </button>
                    </Link>
                    <Link href="/offer-ride">
                      <button className="w-full py-3 border-2 border-uci-blue text-uci-blue rounded-xl hover:bg-uci-blue hover:text-white transition-colors">
                        🚗 Offer a Ride
                      </button>
                    </Link>
                    <Link href="/profile">
                      <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                        👤 Edit Profile
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Pending Requests */}
                {dashboardData && dashboardData.stats.pendingRequestsCount > 0 && (
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-yellow-200 hover-lift">
                    <h3 className="text-lg font-bold text-orange-900 mb-2 flex items-center gap-2">
                      <span>📬</span> Pending Requests
                    </h3>
                    <p className="text-orange-800 text-sm mb-3">
                      You have {dashboardData.stats.pendingRequestsCount} pending ride request(s)
                    </p>
                    <button className="w-full bg-white text-orange-700 py-2 rounded-lg hover:bg-orange-100 transition-colors text-sm font-semibold">
                      Review Requests
                    </button>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift">
                  <h3 className="text-lg font-bold text-uci-navy mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    {dashboardData && dashboardData.recentActivity.length > 0 ? (
                      dashboardData.recentActivity.map((activity: any, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className={`w-2 h-2 rounded-full mt-1.5 ${
                            activity.type.includes('completed') ? 'bg-green-500 status-pulse' : 'bg-blue-500'
                          }`}></span>
                          <span className="text-gray-600 flex-1">{activity.description}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No recent activity</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Success Banner */}
            <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
              <div className="w-16 h-16 uci-gradient rounded-full flex items-center justify-center mx-auto mb-4 float-animation">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-uci-navy mb-2">Dashboard is Live!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your personalized dashboard is now connected to real-time data. Track your rides, manage requests, and see your impact on the UCI community!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
