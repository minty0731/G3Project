import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');

    if (!token) {
        // If no token is found, redirect to the login page
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow the request to continue if the token exists
    return NextResponse.next();
}

// Specify which paths this middleware should be applied to
export const config = {
    matcher: ['/profile'],
};
