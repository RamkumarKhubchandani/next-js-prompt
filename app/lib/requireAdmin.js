import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

/**
 * Validates whether a user session has administrative privileges.
 * Admin if user.role === 'admin' OR user.email is in ADMIN_EMAILS (comma-separated, case-insensitive).
 */
export async function requireAdmin(existingSession) {
    const session = existingSession !== undefined ? existingSession : await getServerSession(authOptions);
    if (!session?.user) return null;

    if (session.user.role === 'admin') {
        return session;
    }

    const userEmail = (session.user.email || '').trim().toLowerCase();
    if (!userEmail) return null;

    const adminEmails = (process.env.ADMIN_EMAILS || '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

    if (adminEmails.includes(userEmail)) {
        return session;
    }

    return null;
}

/**
 * Helper that returns a 403 Forbidden response when session is null/falsy.
 */
export function adminOnly(session = null) {
    if (!session) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return null;
}
