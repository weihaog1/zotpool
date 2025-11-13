'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { redirect } from 'next/navigation'

export default function Profile() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    year: '',
    major: '',
    userType: 'STUDENT',
    phone: '',
    discordTag: '',
    instagram: '',
    linkedin: '',
    preferredGender: 'NO_PREFERENCE',
    smokingPreference: 'NO_SMOKING',
    covidPreference: 'FLEXIBLE',
    musicPreference: '',
    chattiness: ''
  })

  // Load profile data
  useEffect(() => {
    if (session?.user?.email) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          bio: data.bio || '',
          year: data.year || '',
          major: data.major || '',
          userType: data.userType || 'STUDENT',
          phone: data.phone || '',
          discordTag: data.discordTag || '',
          instagram: data.instagram || '',
          linkedin: data.linkedin || '',
          preferredGender: data.preferredGender || 'NO_PREFERENCE',
          smokingPreference: data.smokingPreference || 'NO_SMOKING',
          covidPreference: data.covidPreference || 'FLEXIBLE',
          musicPreference: data.musicPreference || '',
          chattiness: data.chattiness || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      })

      if (response.ok) {
        alert('✅ Profile saved successfully!')
        setIsEditing(false)
      } else {
        const data = await response.json()
        alert(`❌ ${data.error || 'Failed to save profile'}`)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('❌ Failed to save profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 uci-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <span className="text-2xl">🐻‍❄️</span>
          </div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 uci-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">
                    {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || '👤'}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-uci-navy mb-2">
                  {session?.user?.name || 'Your Profile'}
                </h1>
                <p className="text-gray-600">{session?.user?.email}</p>
                <div className="flex justify-center mt-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                    ✅ UCI Verified
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isEditing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'btn-primary'
                  }`}
                >
                  {isEditing ? '✖️ Cancel Editing' : '✏️ Edit Profile'}
                </button>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-uci-navy mb-8">Profile Information</h2>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      disabled={true}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      value={profileData.userType}
                      onChange={(e) => setProfileData({...profileData, userType: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    >
                      <option value="STUDENT">Student</option>
                      <option value="GRADUATE">Graduate Student</option>
                      <option value="STAFF">Staff</option>
                      <option value="FACULTY">Faculty</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {profileData.userType === 'STUDENT' || profileData.userType === 'GRADUATE' ? 'Academic Year' : 'Department'}
                    </label>
                    <input
                      type="text"
                      value={profileData.userType === 'STUDENT' || profileData.userType === 'GRADUATE' ? profileData.year : profileData.major}
                      onChange={(e) => {
                        if (profileData.userType === 'STUDENT' || profileData.userType === 'GRADUATE') {
                          setProfileData({...profileData, year: e.target.value})
                        } else {
                          setProfileData({...profileData, major: e.target.value})
                        }
                      }}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                      placeholder={profileData.userType === 'STUDENT' || profileData.userType === 'GRADUATE' ? 'e.g., Sophomore, Senior, 2nd Year' : 'e.g., Computer Science, Engineering'}
                    />
                  </div>

                  {(profileData.userType === 'STUDENT' || profileData.userType === 'GRADUATE') && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Major</label>
                      <input
                        type="text"
                        value={profileData.major}
                        onChange={(e) => setProfileData({...profileData, major: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                        placeholder="e.g., Computer Science, Business, Biology"
                      />
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={3}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                      !isEditing ? 'bg-gray-50' : ''
                    }`}
                    placeholder="Tell others a bit about yourself, your interests, and your commuting preferences..."
                  />
                </div>

                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-uci-navy mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Discord (Optional)</label>
                      <input
                        type="text"
                        value={profileData.discordTag}
                        onChange={(e) => setProfileData({...profileData, discordTag: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                        placeholder="username#1234"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram (Optional)</label>
                      <input
                        type="text"
                        value={profileData.instagram}
                        onChange={(e) => setProfileData({...profileData, instagram: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                        placeholder="@username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn (Optional)</label>
                      <input
                        type="text"
                        value={profileData.linkedin}
                        onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-uci-navy mb-4">Ride Preferences</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender Preference</label>
                      <select
                        value={profileData.preferredGender}
                        onChange={(e) => setProfileData({...profileData, preferredGender: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      >
                        <option value="NO_PREFERENCE">No Preference</option>
                        <option value="SAME_GENDER_ONLY">Same Gender Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Smoking Policy</label>
                      <select
                        value={profileData.smokingPreference}
                        onChange={(e) => setProfileData({...profileData, smokingPreference: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      >
                        <option value="NO_SMOKING">No Smoking</option>
                        <option value="VAPING_OK">Vaping OK</option>
                        <option value="SMOKING_OK">Smoking OK</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">COVID Preference</label>
                      <select
                        value={profileData.covidPreference}
                        onChange={(e) => setProfileData({...profileData, covidPreference: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-uci-blue focus:border-transparent ${
                          !isEditing ? 'bg-gray-50' : ''
                        }`}
                      >
                        <option value="FLEXIBLE">Flexible</option>
                        <option value="MASKS_PREFERRED">Masks Preferred</option>
                        <option value="MASKS_REQUIRED">Masks Required</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="border-t pt-6">
                    <div className="flex justify-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary px-8 py-3 disabled:opacity-50 glow-button success-pulse"
                      >
                        {saving ? (
                          <span className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-uci-navy"></div>
                            Saving...
                          </span>
                        ) : (
                          '💾 Save Changes'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Success Message */}
            {!isEditing && !loading && (
              <div className="mt-8 text-center bg-green-50 rounded-2xl p-8 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Profile is Active!</h3>
                <p className="text-green-700">
                  Your profile information is being used for AI-powered ride matching. Update anytime to improve your matches!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}