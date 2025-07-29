'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Facility } from '@/types';
import FacilityMap from './FacilityMap';
import PlaceSnippets from './PlaceSnippets';
import { useRouter } from 'next/navigation';
import { MapPin, Search, Filter, LogOut, Phone, Star, Navigation } from 'lucide-react';
import AuthGuard from './AuthGuard';

interface CarePageProps {
  category: string;
  title: string;
  description: string;
  color: string;
}

export default function CarePage({ category, title, description, color }: CarePageProps) {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchFacilities();
    getUserLocation();
  }, [category]);

  const fetchFacilities = async () => {
    try {
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .eq('category', category)
        .order('name');

      if (error) {
        console.error('Error fetching facilities:', error);
      } else {
        setFacilities(data || []);
        setFilteredFacilities(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  };

  useEffect(() => {
    let filtered = facilities;

    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(f => f.city === selectedCity);
    }

    setFilteredFacilities(filtered);
  }, [searchTerm, selectedCity, facilities]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const cities = [...new Set(facilities.map(f => f.city))].sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/care')}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">LoCare App</h1>
                    <p className="text-sm text-gray-600">{title}</p>
                  </div>
                </button>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className={`${color} text-white py-8`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{title}</h2>
              <p className="text-lg opacity-90 mb-4">{description}</p>
              <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{filteredFacilities.length} locations found</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-white border-b py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search facilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map Section */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Navigation className="h-5 w-5 mr-2 text-blue-600" />
                  Interactive Map
                </h3>
                <FacilityMap 
                  facilities={filteredFacilities} 
                  onFacilitySelect={setSelectedFacility}
                  selectedFacility={selectedFacility}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <PlaceSnippets selectedFacility={selectedFacility} />
            </div>
          </div>

          {/* Facilities List */}
          <section className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              All {title} ({filteredFacilities.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFacilities.map((facility) => {
                const distance = userLocation 
                  ? calculateDistance(userLocation.lat, userLocation.lng, facility.latitude, facility.longitude)
                  : null;

                return (
                  <div
                    key={facility.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{facility.name}</h4>
                    
                    <div className="flex items-start space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{facility.address}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {facility.city}
                      </span>
                      {distance && (
                        <span className="text-sm text-gray-500">
                          {distance.toFixed(1)} km away
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {facility.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{facility.phone}</span>
                        </div>
                      )}
                      
                      {facility.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{facility.rating}/5</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredFacilities.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}