import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/*
  The middleware function is called for every request
  that matches the config matcher (see below). It runs
  before the request handler for the page or API route.
*/
export async function middleware(request: NextRequest) {
  const userSession = request.cookies.get('userSession');
  const checkoutSession = request.cookies.get('checkoutSession');

  const nextURL = request.nextUrl.pathname;

  // If the user tries to access any auth page while logged in
  // redirect him to homepage
  if (
    (nextURL === '/sign-in' && userSession?.value) ||
    (nextURL === '/sign-up' && userSession?.value)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user tries to access delivery or payment pages
  // while not logged in or without a checkout session
  // redirect him to homepage
  if (
    (nextURL === '/delivery' && !checkoutSession?.value) ||
    (nextURL === '/payment' && !checkoutSession?.value)
  ) {
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
