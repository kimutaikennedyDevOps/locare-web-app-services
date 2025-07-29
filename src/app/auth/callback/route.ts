import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  
  // Redirect to care page after email verification
  return NextResponse.redirect(`${requestUrl.origin}/care`)
}