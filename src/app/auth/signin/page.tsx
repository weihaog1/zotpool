'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Validate UCI email
    if (!email.endsWith('@uci.edu')) {
      setMessage('Please use your @uci.edu email address')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
      })

      if (result?.error) {
        setMessage('Error: ' + result.error)
      } else {
        setMessage('Check your email for a sign-in link!')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-20 w-20 uci-gradient rounded-full flex items-center justify-center">
            <span className="text-white text-3xl">🐻‍❄️</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to <span className="text-uci-blue">Zotpool</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in with your UCI email to start carpooling
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                UCI Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-uci-blue focus:border-uci-blue focus:z-10 sm:text-sm"
                placeholder="your-email@uci.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {message && (
            <div className={`rounded-md p-4 ${
              message.includes('Error')
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-green-50 text-green-800 border border-green-200'
            }`}>
              <p className="text-sm">{message}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white uci-gradient hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uci-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending magic link...
                </div>
              ) : (
                'Send Magic Link'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Only @uci.edu email addresses are allowed
            </p>
            <p className="text-xs text-gray-500 mt-2">
              🌱 Join the sustainable commuting revolution at UCI
            </p>
          </div>
        </form>

        <div className="mt-8 bg-uci-light-blue bg-opacity-10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-uci-navy mb-3">Why Zotpool?</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">🌍</span>
              Reduce your carbon footprint
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-2">💰</span>
              Save money on gas and parking
            </div>
            <div className="flex items-center">
              <span className="text-blue-500 mr-2">🤝</span>
              Meet fellow UCI community members
            </div>
            <div className="flex items-center">
              <span className="text-purple-500 mr-2">⚡</span>
              AI-powered smart matching
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}