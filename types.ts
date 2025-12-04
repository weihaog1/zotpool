export type UserRole = 'driver' | 'passenger' | 'both';
export type CarCleanliness = 1 | 2 | 3 | 4 | 5;
export type CostType = 'free' | 'split_gas' | 'split_gas_parking' | 'negotiable';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  gender?: string;
  pronouns?: string;
  city?: string;
  major?: string;
  year?: string;
  socials?: {
    instagram?: string;
    discord?: string;
    phone?: string;
  };
  role?: UserRole;
  isOnboarded: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  type: 'driver' | 'passenger';
  origin: string;
  destination: string; // Usually UCI
  schedule: {
    days: string[]; // Mon, Tue, etc.
    timeStart: string;
    timeEnd: string;
    isRecurring: boolean;
  };
  details: {
    carType?: string;
    seats?: number;
    cleanliness?: CarCleanliness;
    yearsDriving?: number;
    genderPreference?: 'any' | 'same';
    costType?: CostType;
    notes?: string;
  };
  createdAt: string;
}
