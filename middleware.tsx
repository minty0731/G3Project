import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        // If no token is found, redirect to the login page
        return NextResponse.redirect(new URL('/', request.url));
    }
    const response = await fetch('http://127.0.0.1:8080/api/user/get_authentication', {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        request.cookies.delete('token')
        return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow the request to continue if the token exists
    return NextResponse.next();
}

// Specify which paths this middleware should be applied to
export const config = {
    matcher: ['/profile'],
};
