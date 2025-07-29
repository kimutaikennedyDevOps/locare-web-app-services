import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token = requestUrl.searchParams.get('token')
  const type = requestUrl.searchParams.get('type')

  if (token && type === 'signup') {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'signup'
    })

    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/auth/signup?error=verification_failed`)
    }
  }

  // Redirect to care page after successful verification
  return NextResponse.redirect(`${requestUrl.origin}/care`)
}