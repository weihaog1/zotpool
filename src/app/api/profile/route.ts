import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { UserType, GenderPreference, SmokingPolicy, CovidPreference } from '@prisma/client'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        year: true,
        major: true,
        department: true,
        userType: true,
        phone: true,
        discordTag: true,
        instagram: true,
        linkedin: true,
        genderPreference: true,
        smokingPolicy: true,
        covidPreference: true,
        uciVerified: true,
        driverVerified: true,
        totalRides: true,
        driverRating: true,
        passengerRating: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    // Validate the data
    const updateData: any = {}

    if (data.name) updateData.name = data.name
    if (data.bio !== undefined) updateData.bio = data.bio
    if (data.year !== undefined) updateData.year = data.year
    if (data.major !== undefined) updateData.major = data.major
    if (data.department !== undefined) updateData.department = data.department
    if (data.userType && Object.values(UserType).includes(data.userType)) {
      updateData.userType = data.userType
    }
    if (data.phone !== undefined) updateData.phone = data.phone
    if (data.discordTag !== undefined) updateData.discordTag = data.discordTag
    if (data.instagram !== undefined) updateData.instagram = data.instagram
    if (data.linkedin !== undefined) updateData.linkedin = data.linkedin

    if (data.genderPreference && Object.values(GenderPreference).includes(data.genderPreference)) {
      updateData.genderPreference = data.genderPreference
    }
    if (data.smokingPolicy && Object.values(SmokingPolicy).includes(data.smokingPolicy)) {
      updateData.smokingPolicy = data.smokingPolicy
    }
    if (data.covidPreference && Object.values(CovidPreference).includes(data.covidPreference)) {
      updateData.covidPreference = data.covidPreference
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        year: true,
        major: true,
        department: true,
        userType: true,
        phone: true,
        discordTag: true,
        instagram: true,
        linkedin: true,
        genderPreference: true,
        smokingPolicy: true,
        covidPreference: true,
        uciVerified: true,
        driverVerified: true,
        totalRides: true,
        driverRating: true,
        passengerRating: true,
        updatedAt: true,
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}