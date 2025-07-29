# LoCare App - Find Care Services in Kenya

A modern, location-based care service finder application built with Next.js 15, Supabase, and Tailwind CSS. LoCare helps users locate day care, disability care, adult care, pet care, and specialized hospitals across Kenya.

## ✨ Features

- **🔐 Multi-Auth Support**: Email, phone, and social media authentication (Google, Facebook)
- **🗺️ Interactive Maps**: Location-based facility search with Leaflet maps
- **🔍 Advanced Search**: Filter by city, search by name/address
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **⚡ Real-time Updates**: Recently viewed places tracking
- **🎯 Location Services**: Distance calculation from user location
- **🔒 Protected Routes**: Authentication-required access to care services

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes (Serverless)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Maps**: React Leaflet
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd locare-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   The `.env.local` file is already configured with Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://rqodprddsblnqwepvdec.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Database Setup**
   
   Run the SQL schema in your Supabase SQL editor:
   ```bash
   # Copy contents of Database.sql to Supabase SQL editor
   ```

5. **Seed the Database**
   ```bash
   node seed-database.js
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### For Users

1. **Browse Services**: Visit the homepage to see available care categories
2. **Sign Up**: Click on any service to be prompted for authentication
3. **Choose Auth Method**: Sign up with email, phone, or social media
4. **Find Care**: Search and filter facilities on interactive maps
5. **View Details**: Click markers or cards to see facility information
6. **Track History**: Recently viewed places are automatically saved

### Authentication Options

- **Email**: Traditional email/password signup
- **Phone**: SMS-based authentication
- **Social**: Google and Facebook OAuth

## 🗺️ Care Categories

- **Day Care**: Quality day care centers for children
- **Disability Care**: Specialized care for people with disabilities  
- **Adult Care**: Senior and adult care facilities
- **Pet Care**: Veterinary clinics and pet services
- **Specialized Hospitals**: Advanced medical facilities

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── care/              # Care service pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── AuthGuard.tsx      # Route protection
│   ├── CarePage.tsx       # Main care page
│   ├── FacilityMap.tsx    # Interactive map
│   └── PlaceSnippets.tsx  # Recently viewed
├── lib/                   # Utilities
│   └── supabase.ts        # Supabase client
└── types/                 # TypeScript types
    └── index.ts
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL schema from `Database.sql`
3. Configure authentication providers in Supabase dashboard
4. Update environment variables if needed

### Authentication Providers

Enable in Supabase Dashboard > Authentication > Providers:
- **Google**: Configure OAuth credentials
- **Facebook**: Configure OAuth credentials
- **Email**: Enabled by default
- **Phone**: Configure SMS provider

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub/GitLab
   git push origin main
   ```

2. **Deploy to Vercel**
   - Import project in Vercel dashboard
   - Environment variables are auto-detected
   - Deploy with zero configuration

3. **Configure Domain** (Optional)
   - Add custom domain in Vercel settings
   - Update Supabase redirect URLs

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📊 Database Schema

### Facilities Table

```sql
CREATE TABLE facilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  longitude DECIMAL(10, 8) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  address TEXT NOT NULL,
  rating DECIMAL(2, 1),
  city TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for backend infrastructure
- **Leaflet** for mapping capabilities
- **Tailwind CSS** for styling system
- **Lucide** for beautiful icons
- **Next.js** for the amazing framework

## 📞 Support

For support, email support@locare.app or create an issue in the repository.

---

**Built with ❤️ for Kenya's healthcare accessibility**