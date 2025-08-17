import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Allow public access to the admin login page
    if (pathname === '/admin/login') {
        return NextResponse.next();
    }

    // If trying to access any other admin page without a token, redirect to admin login
    if (pathname.startsWith('/admin') && !token) {
        const url = req.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
    }

    // If trying to access student dashboard without a token, redirect to student login
    if (pathname.startsWith('/dashboard') && !token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*'],
};
