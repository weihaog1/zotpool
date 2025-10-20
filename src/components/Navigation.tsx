'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'nav-blur shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 uci-gradient rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white text-lg lg:text-xl font-bold">🐻‍❄️</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-bold text-uci-navy">Zotpool</span>
              <span className="text-xs text-uci-blue hidden lg:block">UCI Carpooling</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/find-ride" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
              Find a Ride
            </Link>
            <Link href="/offer-ride" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
              Offer a Ride
            </Link>
            <Link href="/how-it-works" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
              How It Works
            </Link>

            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
                  Dashboard
                </Link>
                <div className="relative group">
                  <Link href="/profile" className="flex items-center space-x-2 text-uci-navy hover:text-uci-blue transition-colors duration-200">
                    <div className="w-8 h-8 bg-uci-blue rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
                      </span>
                    </div>
                    <span className="hidden md:block font-medium">Profile</span>
                  </Link>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-uci-gray hover:text-uci-navy transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth/signin">
                <button className="btn-primary text-sm lg:text-base">
                  Sign In
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1 group"
          >
            <span className={`w-6 h-0.5 bg-uci-navy transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-uci-navy transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-uci-navy transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
            <Link href="/find-ride" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
              Find a Ride
            </Link>
            <Link href="/offer-ride" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
              Offer a Ride
            </Link>
            <Link href="/how-it-works" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
              How It Works
            </Link>

            {session ? (
              <>
                <Link href="/dashboard" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
                  Dashboard
                </Link>
                <Link href="/profile" className="text-uci-navy hover:text-uci-blue transition-colors duration-200 font-medium">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-left text-uci-gray hover:text-uci-navy transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/signin">
                <button className="btn-primary w-full">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}