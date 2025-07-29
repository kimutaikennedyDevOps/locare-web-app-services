'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Facility } from '@/types';
import { MapPin, Phone, Star } from 'lucide-react';

// Fix for default markers in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface MapComponentProps {
  facilities: Facility[];
  onFacilitySelect: (facility: Facility) => void;
  selectedFacility?: Facility | null;
}

export default function MapComponent({ facilities, onFacilitySelect, selectedFacility }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const center: [number, number] = facilities.length > 0 
    ? [facilities[0].latitude, facilities[0].longitude]
    : [-1.2921, 36.8219]; // Nairobi default

  useEffect(() => {
    return () => {
      // Cleanup map instance on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <MapContainer
        center={center}
        zoom={10}
        className="h-full w-full"
        scrollWheelZoom={true}
        ref={mapRef}
        key={`map-${facilities.length}`} // Force re-render when facilities change
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {facilities.map((facility) => (
          <Marker
            key={facility.id}
            position={[facility.latitude, facility.longitude]}
            eventHandlers={{
              click: () => onFacilitySelect(facility),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                
                <div className="flex items-start space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{facility.address}</p>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-blue-600">{facility.city}</span>
                </div>
                
                {facility.phone && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a 
                      href={`tel:${facility.phone}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {facility.phone}
                    </a>
                  </div>
                )}
                
                {facility.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{facility.rating}/5</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}