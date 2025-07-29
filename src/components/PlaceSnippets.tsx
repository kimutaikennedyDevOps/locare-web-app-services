'use client';

import { useEffect, useState, useCallback } from 'react';
import { Facility, RecentlyViewed } from '@/types';
import { Clock, MapPin, Phone, Star, X } from 'lucide-react';

interface PlaceSnippetsProps {
  selectedFacility: Facility | null;
}

export default function PlaceSnippets({ selectedFacility }: PlaceSnippetsProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing recently viewed:', error);
        localStorage.removeItem('recentlyViewed');
      }
    }
  }, []);

  useEffect(() => {
    if (selectedFacility) {
      setRecentlyViewed(prev => {
        const newEntry: RecentlyViewed = {
          facility: selectedFacility,
          viewedAt: new Date().toISOString()
        };

        const updated = [
          newEntry,
          ...prev.filter(item => item.facility.id !== selectedFacility.id)
        ].slice(0, 5);

        localStorage.setItem('recentlyViewed', JSON.stringify(updated));
        return updated;
      });
    }
  }, [selectedFacility]);

  const removeFromRecent = useCallback((facilityId: string) => {
    setRecentlyViewed(prev => {
      const updated = prev.filter(item => item.facility.id !== facilityId);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const viewed = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - viewed.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-6 h-fit">
      {/* Selected Place */}
      {selectedFacility && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3 text-gray-900">Selected Place</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">{selectedFacility.name}</h4>
            
            <div className="flex items-start space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">{selectedFacility.address}</p>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800 bg-blue-100 px-2 py-1 rounded">
                {selectedFacility.city}
              </span>
              {selectedFacility.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-blue-900">{selectedFacility.rating}/5</span>
                </div>
              )}
            </div>
            
            {selectedFacility.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <a 
                  href={`tel:${selectedFacility.phone}`}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  {selectedFacility.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg text-gray-900">Recently Viewed</h3>
            <Clock className="h-5 w-5 text-gray-500" />
          </div>
          
          <div className="space-y-3">
            {recentlyViewed.map((item) => (
              <div 
                key={`${item.facility.id}-${item.viewedAt}`}
                className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
                      {item.facility.name}
                    </h4>
                    
                    <div className="flex items-center space-x-1 mb-1">
                      <MapPin className="h-3 w-3 text-gray-500 flex-shrink-0" />
                      <p className="text-xs text-gray-600 truncate">{item.facility.city}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(item.viewedAt)}
                      </span>
                      {item.facility.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{item.facility.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromRecent(item.facility.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="h-3 w-3 text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {recentlyViewed.length >= 5 && (
            <p className="text-xs text-gray-500 mt-3 text-center">
              Showing last 5 viewed places
            </p>
          )}
        </div>
      )}

      {/* Empty State */}
      {!selectedFacility && recentlyViewed.length === 0 && (
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-medium text-gray-900 mb-1">No places selected</h3>
          <p className="text-sm text-gray-500">
            Click on a facility marker to see details here
          </p>
        </div>
      )}
    </div>
  );
}