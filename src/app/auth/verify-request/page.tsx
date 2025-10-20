export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 uci-gradient rounded-full flex items-center justify-center">
            <span className="text-white text-3xl">📧</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent you a magic link to sign in to Zotpool
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="space-y-4">
            <div className="flex items-center text-green-600">
              <span className="text-2xl mr-3">✅</span>
              <span className="font-medium">Email sent successfully!</span>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Next steps:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Check your UCI email inbox</li>
                <li>Look for an email from Zotpool</li>
                <li>Click the "Sign in to Zotpool" button</li>
                <li>Start carpooling with the UCI community!</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex items-start">
                <span className="text-blue-500 text-lg mr-2">💡</span>
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Can't find the email?</p>
                  <p>Check your spam folder or wait a few minutes for delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/auth/signin"
            className="text-uci-blue hover:text-uci-navy font-medium text-sm"
          >
            ← Back to sign in
          </a>
        </div>

        <div className="bg-uci-gold bg-opacity-20 rounded-lg p-4 text-center">
          <p className="text-sm text-uci-navy">
            <span className="font-medium">Welcome to the UCI family!</span><br />
            🐻‍❄️ ZOT ZOT! Ready to make commuting more sustainable?
          </p>
        </div>
      </div>
    </div>
  )
}