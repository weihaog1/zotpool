import type {
  User,
  Vehicle,
  Schedule,
  Ride,
  RidePassenger,
  Message,
  Review,
  Report,
  Achievement,
  UserAchievement,
  UserType,
  GenderPreference,
  SmokingPolicy,
  CovidPreference,
  ScheduleType,
  RideStatus,
  PassengerStatus,
  MessageType,
  ReviewType,
  ReportReason,
  ReportStatus,
  AchievementCategory
} from '@prisma/client'

// Re-export Prisma types
export type {
  User,
  Vehicle,
  Schedule,
  Ride,
  RidePassenger,
  Message,
  Review,
  Report,
  Achievement,
  UserAchievement,
  UserType,
  GenderPreference,
  SmokingPolicy,
  CovidPreference,
  ScheduleType,
  RideStatus,
  PassengerStatus,
  MessageType,
  ReviewType,
  ReportReason,
  ReportStatus,
  AchievementCategory
}

// Extended types for UI/API
export interface UserProfile extends Omit<User, 'driverRating' | 'passengerRating'> {
  vehicles?: Vehicle[]
  driverRating?: number | null
  passengerRating?: number | null
}

export interface RideWithDetails extends Ride {
  driver: User
  vehicle: Vehicle
  passengers: (RidePassenger & { user: User })[]
  _count: {
    passengers: number
  }
}

export interface MatchScore {
  userId: string
  score: number
  factors: {
    scheduleAlignment: number
    routeOptimization: number
    personalCompatibility: number
    safetyPreferences: number
  }
}

export interface Location {
  address: string
  latitude: number
  longitude: number
}

export interface RouteData {
  distance: number
  duration: number
  polyline: string
  instructions: string[]
}

// Form types
export interface CreateRideForm {
  startLocation: Location
  endLocation: Location
  departureTime: Date
  availableSeats: number
  suggestedFare?: number
  notes?: string
  isRecurring: boolean
  daysOfWeek?: number[]
  endDate?: Date
  flexibilityMinutes?: number
}

export interface SearchRideFilters {
  startLocation?: Location
  endLocation?: Location
  departureTime?: Date
  flexibilityMinutes?: number
  maxDetourMiles?: number
  minRating?: number
  genderPreference?: GenderPreference
  smokingPolicy?: SmokingPolicy
  covidPreference?: CovidPreference
}