import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const isPublicPath = pathname === "/login" || pathname === "/signup" || pathname === "/profile/4"
    const token = request.cookies.get('authToken')?.value || ""
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/profile/:path*', '/profile', '/login', '/signup'

    ],
}