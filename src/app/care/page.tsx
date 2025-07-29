'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { MapPin, Users, Heart, PawPrint, Building2, LogOut } from 'lucide-react';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';

const careServices = [
  {
    id: 'daycare',
    title: 'Day Care',
    description: 'Find quality day care centers for your children',
    icon: Users,
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-600',
    path: '/care/daycare',
    count: 0
  },
  {
    id: 'disability-care',
    title: 'Disability Care',
    description: 'Specialized care services for people with disabilities',
    icon: Heart,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    path: '/care/disability-care',
    count: 0
  },
  {
    id: 'adult-care',
    title: 'Adult Care',
    description: 'Senior and adult care facilities',
    icon: Users,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    path: '/care/adult-care',
    count: 0
  },
  {
    id: 'pet-care',
    title: 'Pet Care',
    description: 'Veterinary clinics and pet care services',
    icon: PawPrint,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    path: '/care/pet-care',
    count: 0
  },
  {
    id: 'specialized-hospitals',
    title: 'Specialized Hospitals',
    description: 'Specialized medical facilities and hospitals',
    icon: Building2,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    path: '/care/specialized-hospitals',
    count: 0
  }
];

export default function CarePage() {
  const [services, setServices] = useState(careServices);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    const fetchCounts = async () => {
      try {
        const updatedServices = await Promise.all(
          careServices.map(async (service) => {
            const category = service.title;
            const { count } = await supabase
              .from('facilities')
              .select('*', { count: 'exact', head: true })
              .eq('category', category);
            
            return { ...service, count: count || 0 };
          })
        );
        
        setServices(updatedServices);
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
    fetchCounts();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">LoCare App</h1>
                  <p className="text-sm text-gray-600">Care Services Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {user && (
                  <div className="text-sm text-gray-600">
                    Welcome, {user.email || user.phone}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-blue-600">Care Service</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Access quality care services across Kenya
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <Link
                      key={service.id}
                      href={service.path}
                      className="care-card p-6 text-center group cursor-pointer"
                    >
                      <div className={`${service.color} ${service.hoverColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h4>
                      
                      <p className="text-gray-600 mb-3">
                        {service.description}
                      </p>
                      
                      <div className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        {service.count} locations
                      </div>
                      
                      <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        Explore Locations
                        <MapPin className="ml-2 h-4 w-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Platform Statistics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {services.reduce((total, service) => total + service.count, 0)}
                </div>
                <p className="text-gray-600">Total Facilities</p>
              </div>
              
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                <p className="text-gray-600">Care Categories</p>
              </div>
              
              <div className="p-4">
                <div className="text-3xl font-bold text-purple-600 mb-2">47</div>
                <p className="text-gray-600">Cities Covered</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}