'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  color: string
  licensePlate: string
  capacity: number
}

export default function OfferRide() {
  const { data: session, status } = useSession()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [showVehicleForm, setShowVehicleForm] = useState(false)
  const [rideData, setRideData] = useState({
    startLocation: '',
    endLocation: '',
    date: '',
    time: '',
    availableSeats: '1',
    suggestedFare: '',
    notes: ''
  })
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    licensePlate: '',
    capacity: '4'
  })

  useEffect(() => {
    if (session) {
      fetchVehicles()
    }
  }, [session])

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles')
      const data = await response.json()
      if (response.ok) {
        setVehicles(data)
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    }
  }

  const addVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      })

      if (response.ok) {
        await fetchVehicles()
        setShowVehicleForm(false)
        setVehicleData({
          make: '',
          model: '',
          year: '',
          color: '',
          licensePlate: '',
          capacity: '4'
        })
      } else {
        const data = await response.json()
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Error adding vehicle:', error)
      alert('Error adding vehicle')
    } finally {
      setLoading(false)
    }
  }

  const postRide = async (e: React.FormEvent) => {
    e.preventDefault()

    if (vehicles.length === 0) {
      alert('Please add a vehicle before offering a ride')
      return
    }

    setLoading(true)

    try {
      const rideDateTime = new Date(`${rideData.date}T${rideData.time}`)

      const response = await fetch('/api/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...rideData,
          departureTime: rideDateTime.toISOString(),
          availableSeats: parseInt(rideData.availableSeats),
          suggestedFare: rideData.suggestedFare ? parseFloat(rideData.suggestedFare) : null
        }),
      })

      if (response.ok) {
        alert('Ride posted successfully!')
        setRideData({
          startLocation: '',
          endLocation: '',
          date: '',
          time: '',
          availableSeats: '1',
          suggestedFare: '',
          notes: ''
        })
      } else {
        const data = await response.json()
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Error posting ride:', error)
      alert('Error posting ride')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 uci-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <span className="text-2xl">🐻‍❄️</span>
          </div>
          <p className="text-gray-600">Loading...</p>
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
            <p className="text-gray-600 mb-8">You need to sign in with your UCI email to offer rides.</p>
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
              Offer a <span className="text-uci-blue">Ride</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Share your commute with fellow UCI community members and help reduce campus traffic
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Vehicle Management */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-uci-navy">Your Vehicles</h2>
                <button
                  onClick={() => setShowVehicleForm(!showVehicleForm)}
                  className="btn-primary"
                >
                  {showVehicleForm ? '✖️ Cancel' : '🚗 Add Vehicle'}
                </button>
              </div>

              {vehicles.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="font-semibold text-gray-900">
                        {vehicle.color} {vehicle.make} {vehicle.model}
                      </div>
                      <div className="text-sm text-gray-600">
                        {vehicle.year} • {vehicle.licensePlate} • {vehicle.capacity} seats
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !showVehicleForm && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                    <div className="text-4xl mb-4">🚗</div>
                    <p className="text-gray-600 mb-4">No vehicles added yet</p>
                    <p className="text-sm text-gray-500">Add a vehicle to start offering rides</p>
                  </div>
                )
              )}

              {/* Add Vehicle Form */}
              {showVehicleForm && (
                <form onSubmit={addVehicle} className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-uci-navy mb-4">Add New Vehicle</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Make</label>
                      <input
                        type="text"
                        required
                        value={vehicleData.make}
                        onChange={(e) => setVehicleData({...vehicleData, make: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                        placeholder="e.g., Toyota, Honda, BMW"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
                      <input
                        type="text"
                        required
                        value={vehicleData.model}
                        onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                        placeholder="e.g., Camry, Civic, X3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                      <input
                        type="number"
                        required
                        min="1990"
                        max="2025"
                        value={vehicleData.year}
                        onChange={(e) => setVehicleData({...vehicleData, year: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                      <input
                        type="text"
                        required
                        value={vehicleData.color}
                        onChange={(e) => setVehicleData({...vehicleData, color: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                        placeholder="e.g., White, Black, Silver"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">License Plate</label>
                      <input
                        type="text"
                        required
                        value={vehicleData.licensePlate}
                        onChange={(e) => setVehicleData({...vehicleData, licensePlate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                        placeholder="e.g., ABC123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
                      <select
                        value={vehicleData.capacity}
                        onChange={(e) => setVehicleData({...vehicleData, capacity: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                      >
                        <option value="2">2 seats</option>
                        <option value="4">4 seats</option>
                        <option value="5">5 seats</option>
                        <option value="7">7 seats</option>
                        <option value="8">8+ seats</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowVehicleForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary px-6 py-3 disabled:opacity-50"
                    >
                      {loading ? 'Adding...' : 'Add Vehicle'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Ride Offer Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-uci-navy mb-6">Post Your Ride</h2>

              <form onSubmit={postRide}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Location</label>
                    <input
                      type="text"
                      required
                      value={rideData.startLocation}
                      onChange={(e) => setRideData({...rideData, startLocation: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                      placeholder="Enter starting point..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Destination</label>
                    <input
                      type="text"
                      required
                      value={rideData.endLocation}
                      onChange={(e) => setRideData({...rideData, endLocation: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                      placeholder="Enter destination..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      required
                      value={rideData.date}
                      onChange={(e) => setRideData({...rideData, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Time</label>
                    <input
                      type="time"
                      required
                      value={rideData.time}
                      onChange={(e) => setRideData({...rideData, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Available Seats</label>
                    <select
                      value={rideData.availableSeats}
                      onChange={(e) => setRideData({...rideData, availableSeats: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                    >
                      <option value="1">1 seat</option>
                      <option value="2">2 seats</option>
                      <option value="3">3 seats</option>
                      <option value="4">4 seats</option>
                      <option value="5">5+ seats</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Suggested Fare ($)</label>
                    <input
                      type="number"
                      step="0.50"
                      min="0"
                      value={rideData.suggestedFare}
                      onChange={(e) => setRideData({...rideData, suggestedFare: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
                  <textarea
                    value={rideData.notes}
                    onChange={(e) => setRideData({...rideData, notes: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent"
                    placeholder="Any additional information about your ride..."
                  ></textarea>
                </div>

                <div className="mt-8 text-center">
                  <button
                    type="submit"
                    disabled={loading || vehicles.length === 0}
                    className="btn-primary text-lg px-12 py-4 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-uci-navy mr-2"></div>
                        Posting...
                      </span>
                    ) : (
                      '🚗 Post Ride Offer'
                    )}
                  </button>
                  {vehicles.length === 0 && (
                    <p className="text-sm text-red-600 mt-2">Please add a vehicle before posting a ride</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}