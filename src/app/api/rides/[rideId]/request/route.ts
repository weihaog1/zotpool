import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { PassengerStatus } from '@prisma/client'

export async function POST(
  request: NextRequest,
  { params }: { params: { rideId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { rideId } = params
    const body = await request.json()
    const { message } = body

    // Check if ride exists and is available
    const ride = await prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        passengers: {
          where: {
            status: { in: ['PENDING', 'CONFIRMED'] }
          }
        },
        driver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    if (!ride) {
      return NextResponse.json({ error: 'Ride not found' }, { status: 404 })
    }

    // Check if user is the driver
    if (ride.driverId === user.id) {
      return NextResponse.json({
        error: 'You cannot request your own ride'
      }, { status: 400 })
    }

    // Check if user has already requested this ride
    const existingRequest = await prisma.ridePassenger.findFirst({
      where: {
        rideId: rideId,
        passengerId: user.id
      }
    })

    if (existingRequest) {
      return NextResponse.json({
        error: existingRequest.status === 'PENDING'
          ? 'You have already requested this ride'
          : existingRequest.status === 'CONFIRMED'
          ? 'You are already confirmed for this ride'
          : 'You have a previous request for this ride'
      }, { status: 400 })
    }

    // Check if ride has available seats
    const confirmedPassengers = ride.passengers.filter(p => p.status === 'CONFIRMED').length
    if (confirmedPassengers >= ride.totalSeats) {
      return NextResponse.json({
        error: 'This ride is fully booked'
      }, { status: 400 })
    }

    // Create ride request
    const ridePassenger = await prisma.ridePassenger.create({
      data: {
        rideId: rideId,
        passengerId: user.id,
        status: PassengerStatus.PENDING,
        requestMessage: message || null
      },
      include: {
        passenger: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        ride: {
          select: {
            id: true,
            startLocation: true,
            endLocation: true,
            departureTime: true,
            driver: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    // TODO: Send notification to driver (email/push notification)
    // await sendNotificationToDriver(ride.driver.email, user.name, ride)

    return NextResponse.json({
      message: 'Ride request sent successfully',
      request: ridePassenger
    }, { status: 201 })
  } catch (error) {
    console.error('Error requesting ride:', error)
    return NextResponse.json({
      error: 'Failed to request ride'
    }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { rideId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { rideId } = params

    // Get user's request for this ride
    const request = await prisma.ridePassenger.findFirst({
      where: {
        rideId: rideId,
        passengerId: user.id
      },
      include: {
        ride: {
          select: {
            id: true,
            startLocation: true,
            endLocation: true,
            departureTime: true,
            driver: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        }
      }
    })

    if (!request) {
      return NextResponse.json({
        error: 'No request found for this ride'
      }, { status: 404 })
    }

    return NextResponse.json(request)
  } catch (error) {
    console.error('Error fetching ride request:', error)
    return NextResponse.json({
      error: 'Failed to fetch ride request'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { rideId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { rideId } = params
    const body = await request.json()
    const { passengerId, status } = body

    // Get the ride and verify user is the driver
    const ride = await prisma.ride.findUnique({
      where: { id: rideId }
    })

    if (!ride) {
      return NextResponse.json({ error: 'Ride not found' }, { status: 404 })
    }

    if (ride.driverId !== user.id) {
      return NextResponse.json({
        error: 'Only the driver can update ride requests'
      }, { status: 403 })
    }

    // Update the passenger request
    const updatedRequest = await prisma.ridePassenger.updateMany({
      where: {
        rideId: rideId,
        passengerId: passengerId
      },
      data: {
        status: status
      }
    })

    if (updatedRequest.count === 0) {
      return NextResponse.json({
        error: 'Request not found'
      }, { status: 404 })
    }

    // TODO: Send notification to passenger
    // await sendNotificationToPassenger(passenger.email, status, ride)

    return NextResponse.json({
      message: `Request ${status.toLowerCase()} successfully`
    })
  } catch (error) {
    console.error('Error updating ride request:', error)
    return NextResponse.json({
      error: 'Failed to update ride request'
    }, { status: 500 })
  }
}
