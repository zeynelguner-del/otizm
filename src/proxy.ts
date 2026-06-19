import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = "otizmSessionV1";

const protectedPaths = [
  '/family',
  '/emotions',
  '/calendar',
  '/music',
  '/acc',
  '/games',
  '/imitation',
  '/speech-therapy',
  '/duyusal-oda',
  '/sentence-sounds',
  '/education-reminder',
  '/admin',
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirect /aac to /acc to prevent duplicate content
  if (pathname === '/aac' || pathname.startsWith('/aac/')) {
    return NextResponse.redirect(new URL('/acc', request.url), { status: 301 });
  }

  // 2. Protect private panel and tool routes
  const isProtected = protectedPaths.some((path) => 
    pathname === path || pathname.startsWith(path + '/')
  );

  if (isProtected) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
    if (!sessionCookie) {
      // Redirect to landing page where login form is present
      return NextResponse.redirect(new URL('/', request.url));
    }
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
     * - otizeka-logo.png, otizeka-banner.jpg, etc. (static public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.mp4|google.*\\.html).*)',
  ],
};
