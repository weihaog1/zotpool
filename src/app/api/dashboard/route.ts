import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
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

    // Get rides where user is the driver
    const ridesAsDriver = await prisma.ride.findMany({
      where: {
        driverId: user.id
      },
      include: {
        passengers: {
          include: {
            passenger: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        vehicle: {
          select: {
            make: true,
            model: true,
            color: true
          }
        }
      },
      orderBy: {
        departureTime: 'desc'
      },
      take: 10
    })

    // Get rides where user is a passenger
    const ridesAsPassenger = await prisma.ridePassenger.findMany({
      where: {
        passengerId: user.id
      },
      include: {
        ride: {
          include: {
            driver: {
              select: {
                name: true,
                email: true,
                driverRating: true
              }
            },
            vehicle: {
              select: {
                make: true,
                model: true,
                color: true
              }
            }
          }
        }
      },
      orderBy: {
        ride: {
          departureTime: 'desc'
        }
      },
      take: 10
    })

    // Get pending ride requests for user's rides
    const pendingRequests = await prisma.ridePassenger.findMany({
      where: {
        ride: {
          driverId: user.id
        },
        status: 'PENDING'
      },
      include: {
        passenger: {
          select: {
            name: true,
            email: true
          }
        },
        ride: {
          select: {
            id: true,
            startLocation: true,
            endLocation: true,
            departureTime: true
          }
        }
      }
    })

    // Calculate statistics
    const totalRidesAsDriver = await prisma.ride.count({
      where: {
        driverId: user.id,
        status: { in: ['COMPLETED', 'IN_PROGRESS'] }
      }
    })

    const totalRidesAsPassenger = await prisma.ridePassenger.count({
      where: {
        passengerId: user.id,
        status: 'CONFIRMED',
        ride: {
          status: { in: ['COMPLETED', 'IN_PROGRESS'] }
        }
      }
    })

    // Get upcoming rides
    const upcomingAsDriver = await prisma.ride.findMany({
      where: {
        driverId: user.id,
        departureTime: {
          gte: new Date()
        },
        status: { in: ['PENDING', 'CONFIRMED'] }
      },
      include: {
        passengers: {
          where: {
            status: { in: ['PENDING', 'CONFIRMED'] }
          },
          include: {
            passenger: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        departureTime: 'asc'
      },
      take: 5
    })

    const upcomingAsPassenger = await prisma.ridePassenger.findMany({
      where: {
        passengerId: user.id,
        status: { in: ['PENDING', 'CONFIRMED'] },
        ride: {
          departureTime: {
            gte: new Date()
          }
        }
      },
      include: {
        ride: {
          include: {
            driver: {
              select: {
                name: true,
                driverRating: true
              }
            },
            vehicle: {
              select: {
                make: true,
                model: true,
                color: true
              }
            }
          }
        }
      },
      orderBy: {
        ride: {
          departureTime: 'asc'
        }
      },
      take: 5
    })

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        driverRating: user.driverRating,
        totalRides: user.totalRides
      },
      stats: {
        totalRidesAsDriver,
        totalRidesAsPassenger,
        totalRides: totalRidesAsDriver + totalRidesAsPassenger,
        driverRating: user.driverRating || 0,
        pendingRequestsCount: pendingRequests.length
      },
      upcomingRides: {
        asDriver: upcomingAsDriver.map(ride => ({
          ...ride,
          type: 'driver'
        })),
        asPassenger: upcomingAsPassenger.map(rp => ({
          ...rp.ride,
          requestStatus: rp.status,
          type: 'passenger'
        }))
      },
      pendingRequests,
      recentActivity: [
        ...ridesAsDriver.slice(0, 3).map(ride => ({
          type: 'completed_driver',
          description: `Completed ride to ${ride.endLocation}`,
          timestamp: ride.departureTime
        })),
        ...ridesAsPassenger.slice(0, 2).map(rp => ({
          type: 'completed_passenger',
          description: `Rode with ${rp.ride.driver.name}`,
          timestamp: rp.ride.departureTime
        }))
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5)
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json({
      error: 'Failed to fetch dashboard data'
    }, { status: 500 })
  }
}
