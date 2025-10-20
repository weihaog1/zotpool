import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { RideStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const date = searchParams.get('date')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build search filters
    const where: any = {
      status: RideStatus.PENDING,
      departureTime: {
        gte: new Date()
      }
    }

    if (from) {
      where.startLocation = {
        contains: from,
        mode: 'insensitive'
      }
    }

    if (to) {
      where.endLocation = {
        contains: to,
        mode: 'insensitive'
      }
    }

    if (date) {
      const searchDate = new Date(date)
      const nextDay = new Date(searchDate)
      nextDay.setDate(nextDay.getDate() + 1)

      where.departureTime = {
        gte: searchDate,
        lt: nextDay
      }
    }

    const rides = await prisma.ride.findMany({
      where,
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            driverRating: true,
            totalRides: true,
            userType: true,
            year: true,
            major: true
          }
        },
        vehicle: {
          select: {
            make: true,
            model: true,
            color: true,
            capacity: true
          }
        },
        passengers: {
          select: {
            id: true,
            status: true
          }
        }
      },
      orderBy: {
        departureTime: 'asc'
      },
      take: limit
    })

    // Calculate available seats and add compatibility score placeholder
    const ridesWithDetails = rides.map(ride => ({
      ...ride,
      availableSeats: ride.totalSeats - ride.passengers.filter(p => p.status === 'CONFIRMED').length,
      compatibilityScore: Math.random() * 0.3 + 0.7 // Placeholder: 70-100% compatibility
    }))

    return NextResponse.json(ridesWithDetails)
  } catch (error) {
    console.error('Error fetching rides:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        vehicles: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.vehicles.length === 0) {
      return NextResponse.json({
        error: 'You need to add a vehicle to your profile before offering rides'
      }, { status: 400 })
    }

    const data = await request.json()

    // Validate required fields
    if (!data.startLocation || !data.endLocation || !data.departureTime || !data.availableSeats) {
      return NextResponse.json({
        error: 'Missing required fields: startLocation, endLocation, departureTime, availableSeats'
      }, { status: 400 })
    }

    // Use the user's first vehicle (in a real app, they would select which vehicle)
    const vehicle = user.vehicles[0]

    const ride = await prisma.ride.create({
      data: {
        driverId: user.id,
        vehicleId: vehicle.id,
        startLocation: data.startLocation,
        startLatitude: data.startLatitude || 0, // Default coordinates
        startLongitude: data.startLongitude || 0,
        endLocation: data.endLocation,
        endLatitude: data.endLatitude || 0,
        endLongitude: data.endLongitude || 0,
        departureTime: new Date(data.departureTime),
        arrivalTime: data.arrivalTime ? new Date(data.arrivalTime) : null,
        availableSeats: parseInt(data.availableSeats),
        totalSeats: parseInt(data.availableSeats),
        suggestedFare: data.suggestedFare ? parseFloat(data.suggestedFare) : null,
        notes: data.notes || null,
        status: RideStatus.PENDING
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            driverRating: true,
            totalRides: true
          }
        },
        vehicle: {
          select: {
            make: true,
            model: true,
            color: true,
            capacity: true
          }
        }
      }
    })

    return NextResponse.json(ride, { status: 201 })
  } catch (error) {
    console.error('Error creating ride:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}