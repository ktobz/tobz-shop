import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Add middleware logic here if needed, e.g., auth protection
    return NextResponse.next()
}

export const config = {
    matcher: '/:path*',
}
