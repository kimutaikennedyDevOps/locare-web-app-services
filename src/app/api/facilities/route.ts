import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const city = searchParams.get('city');
  const search = searchParams.get('search');

  try {
    let query = supabase.from('facilities').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }

    if (city) {
      query = query.eq('city', city);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,address.ilike.%${search}%,city.ilike.%${search}%`);
    }

    query = query.order('name');

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}