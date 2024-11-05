import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getArrayFromLocalStorage } from './app/ultilities/localStorageManager';

// Define private paths
const privatePaths = ['/flare', '/profile', '/settings'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is in the list of private paths
  if (privatePaths.includes(pathname)) {
    // Redirect to /login if accessing a private path
    const isLogin = true
    if(isLogin) {
      // console.log("This guys already logined.")
      return NextResponse.next();
    } 
    
    // console.log("This guys is not login.")
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to other paths
  return NextResponse.next();
}

// Set matcher to apply the middleware to all routes
export const config = {
  matcher: '/:path*',
};
