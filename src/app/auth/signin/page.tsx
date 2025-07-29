'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signinMethod, setSigninMethod] = useState<'email' | 'phone'>('email');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleEmailSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Successfully signed in!');
        router.push('/care/daycare'); // Redirect to a care page
      }
    } catch (error) {
      setMessage('An unexpected error occurred during signin');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password,
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Successfully signed in!');
        router.push('/care/daycare'); // Redirect to a care page
      }
    } catch (error) {
      setMessage('An unexpected error occurred during signin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">LoCare App</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access care services</p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-50 border border-red-200 text-red-700' 
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Signin Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSigninMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              signinMethod === 'email'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Mail className="h-4 w-4 inline mr-2" />
            Email
          </button>
          <button
            onClick={() => setSigninMethod('phone')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              signinMethod === 'phone'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Phone className="h-4 w-4 inline mr-2" />
            Phone
          </button>
        </div>

        {/* Signin Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {signinMethod === 'email' ? (
            <form onSubmit={handleEmailSignin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In with Email'}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePhoneSignin} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+254700000000"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="phone-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In with Phone'}
              </button>
            </form>
          )}
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Instructions:</h4>
          <p className="text-xs text-blue-700">
            Create an account first using the signup page, then use those same credentials to sign in here.
          </p>
        </div>
      </div>
    </div>
  );
}