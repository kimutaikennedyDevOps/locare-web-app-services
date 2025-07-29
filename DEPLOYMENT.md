# Deployment Guide

## 🚀 Quick Deploy to Vercel

1. **Push to GitHub** (already done)
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo: `locare-web-app-services`
   - Vercel will auto-detect Next.js

3. **Environment Variables**:
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://rqodprddsblnqwepvdec.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb2RwcmRkc2JsbnF3ZXB2ZGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NDIzMTcsImV4cCI6MjA2OTAxODMxN30.prC_i0hgB_ypSAiypRqXhd1yv_XRyYl8h_UvUyFotKI
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxb2RwcmRkc2JsbnF3ZXB2ZGVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ0MjMxNywiZXhwIjoyMDY5MDE4MzE3fQ.u7y36Fy-vNP_n3ax58PF6wzpzw6Zz0nVigHt4jcilrA
   ```

4. **Deploy**: Click "Deploy" - Done! ✅

## 📊 Database Status
- ✅ Database seeded with 134 facilities
- ✅ All care categories populated
- ✅ Authentication configured