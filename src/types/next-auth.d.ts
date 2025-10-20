import NextAuth from 'next-auth'
import { UserType } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      uciVerified?: boolean
      userType?: UserType
      driverVerified?: boolean
      totalRides?: number
      driverRating?: number | null
      passengerRating?: number | null
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    uciVerified?: boolean
    userType?: UserType
    driverVerified?: boolean
    totalRides?: number
    driverRating?: number | null
    passengerRating?: number | null
  }
}