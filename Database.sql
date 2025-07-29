-- Create facilities table
CREATE TABLE IF NOT EXISTS facilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Day Care', 'Disability Care', 'Adult Care', 'Pet Care', 'Specialized Hospitals')),
  longitude DECIMAL(10, 8) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  address TEXT NOT NULL,
  rating DECIMAL(2, 1),
  city TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_facilities_category ON facilities(category);
CREATE INDEX IF NOT EXISTS idx_facilities_city ON facilities(city);
CREATE INDEX IF NOT EXISTS idx_facilities_location ON facilities(latitude, longitude);

-- Enable Row Level Security
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to all users
CREATE POLICY "Allow read access to facilities" ON facilities
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON facilities
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
