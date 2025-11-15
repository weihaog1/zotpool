import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

/**
 * Calculate compatibility score between a passenger and a ride using Gemini AI
 * Analyzes schedule, preferences, and route alignment
 */
export async function calculateRideCompatibility(
  passenger: {
    name: string
    preferences?: {
      preferredGender?: string
      smokingPreference?: string
      covidVaccinated?: boolean
      musicPreference?: string
      chattiness?: string
    }
    schedule?: {
      preferredDepartureTime?: string
      flexibility?: string
    }
  },
  ride: {
    driver: {
      name: string
      userType: string
      year?: string | null
      major?: string | null
      totalRides: number
      driverRating: number | null
    }
    startLocation: string
    endLocation: string
    departureTime: Date
    notes?: string | null
    suggestedFare: number | null
  },
  searchPreferences: {
    from?: string
    to?: string
    time?: string
  }
): Promise<{
  score: number
  reasoning: string
  highlights: string[]
}> {
  // If Gemini API is not configured, return a placeholder score
  if (!genAI) {
    console.warn('Gemini API not configured, using placeholder compatibility score')
    return {
      score: Math.random() * 0.3 + 0.7,
      reasoning: 'Gemini API not configured. This is a placeholder score.',
      highlights: ['Location match', 'Time compatibility']
    }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `You are an AI assistant for a university carpooling platform. Analyze the compatibility between a passenger and a ride offer.

Passenger Profile:
- Name: ${passenger.name}
- Preferences: ${JSON.stringify(passenger.preferences || {}, null, 2)}
- Schedule: ${JSON.stringify(passenger.schedule || {}, null, 2)}

Search Criteria:
- From: ${searchPreferences.from || 'Not specified'}
- To: ${searchPreferences.to || 'Not specified'}
- Preferred Time: ${searchPreferences.time || 'Not specified'}

Ride Offer:
- Driver: ${ride.driver.name} (${ride.driver.userType}${ride.driver.year ? `, ${ride.driver.year}` : ''}${ride.driver.major ? `, ${ride.driver.major}` : ''})
- Experience: ${ride.driver.totalRides} total rides${ride.driver.driverRating ? `, ${ride.driver.driverRating.toFixed(1)}★ rating` : ''}
- Route: ${ride.startLocation} → ${ride.endLocation}
- Departure: ${ride.departureTime.toLocaleString()}
- Fare: ${ride.suggestedFare ? `$${ride.suggestedFare}` : 'Free'}
- Notes: ${ride.notes || 'None'}

Analyze the following factors:
1. **Route Alignment** (40%): How well does the ride route match the passenger's search criteria?
2. **Schedule Compatibility** (30%): How well does the departure time align with passenger preferences?
3. **Driver Reliability** (20%): Consider driver's experience, rating, and ride history
4. **Personal Compatibility** (10%): Any preference matches or compatibility indicators

Return a JSON response with this exact structure:
{
  "score": <number between 0.0 and 1.0>,
  "reasoning": "<brief 1-2 sentence explanation>",
  "highlights": ["<highlight 1>", "<highlight 2>", "<highlight 3>"]
}

The score should be:
- 0.95-1.0: Perfect match (exact route, great timing, excellent driver)
- 0.85-0.94: Excellent match (very good alignment)
- 0.70-0.84: Good match (solid compatibility)
- 0.50-0.69: Fair match (some alignment but compromises needed)
- 0.0-0.49: Poor match (significant misalignment)

Be objective and analytical. Focus on practical compatibility factors.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to parse Gemini response')
    }

    const parsedResponse = JSON.parse(jsonMatch[0])

    return {
      score: Math.max(0, Math.min(1, parsedResponse.score)), // Clamp between 0-1
      reasoning: parsedResponse.reasoning,
      highlights: parsedResponse.highlights || []
    }
  } catch (error) {
    console.error('Error calculating compatibility with Gemini:', error)
    // Fallback to rule-based matching if Gemini fails
    return calculateFallbackCompatibility(searchPreferences, ride)
  }
}

/**
 * Fallback rule-based compatibility calculation when Gemini is unavailable
 */
function calculateFallbackCompatibility(
  searchPreferences: {
    from?: string
    to?: string
    time?: string
  },
  ride: {
    startLocation: string
    endLocation: string
    departureTime: Date
    driver: {
      totalRides: number
      driverRating: number | null
    }
  }
): {
  score: number
  reasoning: string
  highlights: string[]
} {
  let score = 0.5 // Base score
  const highlights: string[] = []

  // Route matching (up to +0.4)
  let routeScore = 0
  if (searchPreferences.from && ride.startLocation.toLowerCase().includes(searchPreferences.from.toLowerCase())) {
    routeScore += 0.2
    highlights.push('Starting location match')
  }
  if (searchPreferences.to && ride.endLocation.toLowerCase().includes(searchPreferences.to.toLowerCase())) {
    routeScore += 0.2
    highlights.push('Destination match')
  }
  score += routeScore

  // Driver reliability (up to +0.2)
  if (ride.driver.totalRides > 10) {
    score += 0.1
    highlights.push('Experienced driver')
  }
  if (ride.driver.driverRating && ride.driver.driverRating >= 4.5) {
    score += 0.1
    highlights.push('Highly rated driver')
  }

  // Time matching (up to +0.2)
  if (searchPreferences.time) {
    const [searchHour] = searchPreferences.time.split(':').map(Number)
    const rideHour = ride.departureTime.getHours()
    const hourDiff = Math.abs(searchHour - rideHour)

    if (hourDiff <= 1) {
      score += 0.2
      highlights.push('Perfect time match')
    } else if (hourDiff <= 2) {
      score += 0.1
      highlights.push('Good time compatibility')
    }
  }

  // Random variation for realism
  score += (Math.random() - 0.5) * 0.1

  return {
    score: Math.max(0.3, Math.min(1, score)), // Clamp between 0.3-1.0
    reasoning: `Match based on ${highlights.length > 0 ? highlights.join(', ').toLowerCase() : 'route and schedule analysis'}`,
    highlights: highlights.length > 0 ? highlights : ['Compatible route', 'Suitable timing']
  }
}

/**
 * Batch calculate compatibility scores for multiple rides
 */
export async function calculateBatchCompatibility(
  passenger: Parameters<typeof calculateRideCompatibility>[0],
  rides: Parameters<typeof calculateRideCompatibility>[1][],
  searchPreferences: Parameters<typeof calculateRideCompatibility>[2]
): Promise<Array<{
  rideId: string
  score: number
  reasoning: string
  highlights: string[]
}>> {
  // Process rides in parallel for better performance
  const promises = rides.map(async (ride: any) => {
    const compatibility = await calculateRideCompatibility(passenger, ride, searchPreferences)
    return {
      rideId: ride.id,
      ...compatibility
    }
  })

  return Promise.all(promises)
}
