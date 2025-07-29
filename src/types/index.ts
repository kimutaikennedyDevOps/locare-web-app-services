export interface Facility {
  id: string;
  name: string;
  category: 'Day Care' | 'Disability Care' | 'Adult Care' | 'Pet Care' | 'Specialized Hospitals';
  longitude: number;
  latitude: number;
  address: string;
  rating: number | null;
  city: string;
  phone: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface RecentlyViewed {
  facility: Facility;
  viewedAt: string;
}