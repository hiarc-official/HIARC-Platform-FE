import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 개발 환경에서만 CSP 헤더 수정
  if (process.env.NODE_ENV === 'development') {
    const response = NextResponse.next();
    
    // 더 관대한 CSP 설정
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-scripts.com https://*.vercel.com",
        "style-src 'self' 'unsafe-inline' https: https://cdn.jsdelivr.net",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data: https:",
        "connect-src 'self' https://test.hiarc-official.com https://*.hiarc-official.com https://vitals.vercel-analytics.com https://vitals.vercel-insights.com https://*.vercel.com http://localhost:* https://localhost:* ws://localhost:* wss://localhost:*",
        "frame-ancestors 'none'",
        "form-action 'self'"
      ].join('; ')
    );
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};