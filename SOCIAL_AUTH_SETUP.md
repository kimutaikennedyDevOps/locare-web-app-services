# Social Authentication Setup (Optional)

If you want to enable Google and Facebook authentication, follow these steps:

## 1. Enable Providers in Supabase

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project: `rqodprddsblnqwepvdec`
3. Navigate to **Authentication** > **Providers**

## 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to **Credentials** > **Create Credentials** > **OAuth 2.0 Client ID**
5. Set authorized redirect URIs:
   - `https://rqodprddsblnqwepvdec.supabase.co/auth/v1/callback`
6. Copy Client ID and Client Secret
7. In Supabase Dashboard, enable Google provider and paste the credentials

## 3. Facebook OAuth Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Set Valid OAuth Redirect URIs:
   - `https://rqodprddsblnqwepvdec.supabase.co/auth/v1/callback`
5. Copy App ID and App Secret
6. In Supabase Dashboard, enable Facebook provider and paste the credentials

## 4. Update Code (After Setup)

Once providers are enabled, you can uncomment the social auth buttons in:
- `src/app/auth/signup/page.tsx`
- `src/app/auth/signin/page.tsx`

## Current Status

The app currently works with:
- ✅ Email/Password authentication
- ✅ Phone/Password authentication (if SMS provider is configured)
- ❌ Social authentication (disabled to prevent errors)

## Note

The app is fully functional without social authentication. Users can create accounts using email or phone numbers.