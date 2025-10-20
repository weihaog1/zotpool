'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Configuration Error',
          message: 'There is a problem with the server configuration.',
          icon: '⚙️'
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'Only @uci.edu email addresses are allowed to access Zotpool.',
          icon: '🚫'
        }
      case 'Verification':
        return {
          title: 'Verification Error',
          message: 'The verification link is invalid or has expired.',
          icon: '⚠️'
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An error occurred during sign in. Please try again.',
          icon: '❌'
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">{errorInfo.icon}</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {errorInfo.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {errorInfo.message}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          {error === 'AccessDenied' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-start">
                  <span className="text-blue-500 text-lg mr-2">🎓</span>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">UCI Community Only</p>
                    <p>Zotpool is exclusively for UCI students, staff, and faculty with valid @uci.edu email addresses.</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>If you're part of the UCI community:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Make sure you're using your official @uci.edu email</li>
                  <li>Check that your UCI email account is active</li>
                  <li>Contact UCI IT if you're having email issues</li>
                </ul>
              </div>
            </div>
          )}

          {error === 'Verification' && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex items-start">
                  <span className="text-yellow-500 text-lg mr-2">⏰</span>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Link Expired</p>
                    <p>Verification links expire after 24 hours for security.</p>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>What to do next:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Request a new sign-in link</li>
                  <li>Check your email immediately after requesting</li>
                  <li>Click the link within 24 hours</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <a
              href="/auth/signin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white uci-gradient hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uci-blue"
            >
              Try Again
            </a>
          </div>

          <div className="text-center">
            <a
              href="/"
              className="text-uci-blue hover:text-uci-navy font-medium text-sm"
            >
              ← Back to home
            </a>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-600">
            Need help? Contact the Zotpool team or visit UCI IT support.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uci-blue"></div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}