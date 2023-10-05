import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/*
  The middleware function is called for every request
  that matches the config matcher (see below). It runs
  before the request handler for the page or API route.
*/
export async function middleware(request: NextRequest) {
  const userSession = request.cookies.get('userSession');

  const nextURL = request.nextUrl.pathname;

  // If the user tries to access auth page while logged in
  // redirect him to homepage
  if (nextURL === '/sign-in' && userSession?.value || nextURL === '/sign-up' && userSession?.value) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user tries to access checkout page while not logged in
  // redirect him to homepage
  if (nextURL === '/checkout' && !userSession?.value) {
    return NextResponse.redirect(new URL('/', request.url));
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
     * - assets/images
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets/images).*)',
  ],
};
