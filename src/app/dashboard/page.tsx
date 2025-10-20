import Navigation from '@/components/Navigation'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-uci-navy mb-6">
              Your <span className="text-uci-blue">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your rides, view your stats, and connect with the UCI community
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-uci-blue mb-2">12</div>
                <div className="text-gray-600">Total Rides</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">8</div>
                <div className="text-gray-600">As Passenger</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
                <div className="text-gray-600">As Driver</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="text-3xl font-bold text-uci-gold mb-2">4.8</div>
                <div className="text-gray-600">Rating</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upcoming Rides */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-uci-navy mb-6">Upcoming Rides</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">UCI Campus → Newport Beach</div>
                        <div className="text-sm text-gray-600">Tomorrow, 3:30 PM</div>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmed</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Driver: Sarah M. • 2 seats available
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-gray-900">Home → UCI Campus</div>
                        <div className="text-sm text-gray-600">Friday, 8:00 AM</div>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Your ride offer • 1 passenger interested
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 border-2 border-uci-blue text-uci-blue rounded-xl hover:bg-uci-blue hover:text-white transition-colors">
                  View All Rides
                </button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-uci-navy mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full btn-primary py-3">
                      🔍 Find a Ride
                    </button>
                    <button className="w-full py-3 border-2 border-uci-blue text-uci-blue rounded-xl hover:bg-uci-blue hover:text-white transition-colors">
                      🚗 Offer a Ride
                    </button>
                    <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                      📅 View Schedule
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-uci-navy mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-gray-600">Completed ride with Mike K.</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      <span className="text-gray-600">New ride request from Lisa T.</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      <span className="text-gray-600">Earned "Eco Warrior" badge</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="w-24 h-24 uci-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚧</span>
            </div>
            <h3 className="text-2xl font-bold text-uci-navy mb-4">Dashboard Coming Soon!</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building a comprehensive dashboard where you can manage all your rides,
              view your impact stats, and connect with the UCI community.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}