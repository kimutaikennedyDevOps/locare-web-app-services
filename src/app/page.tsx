'use client';

import { useState } from 'react';
import { MapPin, Heart, Users, PawPrint, Building2, Stethoscope } from 'lucide-react';
import Link from 'next/link';

const careServices = [
  {
    id: 'daycare',
    title: 'Day Care',
    description: 'Find quality day care centers for your children',
    icon: Users,
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-600',
    path: '/care/daycare'
  },
  {
    id: 'disability-care',
    title: 'Disability Care',
    description: 'Specialized care services for people with disabilities',
    icon: Heart,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    path: '/care/disability-care'
  },
  {
    id: 'adult-care',
    title: 'Adult Care',
    description: 'Senior and adult care facilities',
    icon: Users,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    path: '/care/adult-care'
  },
  {
    id: 'pet-care',
    title: 'Pet Care',
    description: 'Veterinary clinics and pet care services',
    icon: PawPrint,
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    path: '/care/pet-care'
  },
  {
    id: 'specialized-hospitals',
    title: 'Specialized Hospitals',
    description: 'Specialized medical facilities and hospitals',
    icon: Building2,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    path: '/care/specialized-hospitals'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">LoCare App</h1>
            </div>
            <div className="text-sm text-gray-600">
              Find care services across Kenya
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Stethoscope className="h-4 w-4" />
              <span>Healthcare & Care Services Locator</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find the <span className="text-blue-600">Care</span> You Need
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Locate quality day care, disability care, adult care, pet care, and specialized hospitals across Kenya with ease.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Care Service
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Link
                  key={service.id}
                  href={service.path}
                  className="care-card p-8 text-center group cursor-pointer"
                >
                  <div className={`${service.color} ${service.hoverColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-200`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Find Locations
                    <MapPin className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">
            Why Choose LoCare App?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Location-Based</h4>
              <p className="text-gray-600">Find care services near your location with interactive maps</p>
            </div>
            
            <div className="p-6">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Comprehensive</h4>
              <p className="text-gray-600">All types of care services in one convenient platform</p>
            </div>
            
            <div className="p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Verified</h4>
              <p className="text-gray-600">Verified and up-to-date information about care facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">LoCare App</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Connecting you to quality care services across Kenya
          </p>
          <p className="text-sm text-gray-500">
            © 2024 LoCare App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}