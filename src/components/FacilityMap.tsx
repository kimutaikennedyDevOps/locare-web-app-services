'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Facility } from '@/types';
import { MapPin } from 'lucide-react';

interface FacilityMapProps {
  facilities: Facility[];
  onFacilitySelect: (facility: Facility) => void;
  selectedFacility?: Facility | null;
}

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-gray-500 flex items-center space-x-2">
        <MapPin className="h-5 w-5 animate-pulse" />
        <span>Loading map...</span>
      </div>
    </div>
  )
});

export default function FacilityMap({ facilities, onFacilitySelect, selectedFacility }: FacilityMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-96 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
      <MapComponent 
        facilities={facilities}
        onFacilitySelect={onFacilitySelect}
        selectedFacility={selectedFacility}
      />
    </div>
  );
}