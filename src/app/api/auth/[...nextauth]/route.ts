import NextAuth, { AuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import EmailProvider from 'next-auth/providers/email'
import { sendVerificationRequest } from '@/lib/email'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.SMTP_USER,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      // Validate that email is from UCI
      if (email?.verificationRequest) {
        const emailAddress = user.email
        if (!emailAddress?.endsWith('@uci.edu')) {
          throw new Error('Only @uci.edu email addresses are allowed')
        }
      }
      return true
    },
    async session({ session, user }) {
      // Add user ID to session
      if (session.user) {
        session.user.id = user.id

        // Get additional user data from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            uciVerified: true,
            userType: true,
            driverVerified: true,
            totalRides: true,
            driverRating: true,
            passengerRating: true,
          }
        })

        if (dbUser) {
          session.user.uciVerified = dbUser.uciVerified
          session.user.userType = dbUser.userType
          session.user.driverVerified = dbUser.driverVerified
          session.user.totalRides = dbUser.totalRides
          session.user.driverRating = dbUser.driverRating
          session.user.passengerRating = dbUser.passengerRating
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  events: {
    async createUser({ user }) {
      // Automatically mark UCI email as verified and set user type
      if (user.email?.endsWith('@uci.edu')) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            uciVerified: true,
            emailVerified: true,
            // Extract name from email if not provided
            name: user.name || user.email.split('@')[0].replace(/[._]/g, ' '),
          }
        })
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
  session: {
    strategy: 'database' as const,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }