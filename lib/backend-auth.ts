
import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export interface AuthResult {
    error?: string;
    status?: number;
    uid?: string;
}

/**
 * Verifies the Firebase ID Token in the Authorization header.
 * 
 * @param request The NextRequest object
 * @param targetUserId Optional. If provided, ensures the token's UID matches this ID.
 * @returns AuthResult with error details or the verified UID.
 */
export async function verifyAuth(request: NextRequest, targetUserId?: string): Promise<AuthResult> {
    // Development Bypass for mock user
    if (process.env.NODE_ENV === 'development') {
        // If the target user is the dev mock user, allow without token
        if (targetUserId === 'dev-mock-user') {
            return { uid: 'dev-mock-user' };
        }
    }

    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return { error: 'Unauthorized: Missing token', status: 401 };
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decoded = await adminAuth.verifyIdToken(token);

        // If a specific user ID is targeted, enforce strict matching (IDOR prevention)
        if (targetUserId && decoded.uid !== targetUserId) {
            return { error: 'Forbidden: UID mismatch', status: 403 };
        }

        return { uid: decoded.uid };
    } catch (e) {
        console.error('[VerifyAuth] Token verification failed:', e);
        return { error: 'Unauthorized: Invalid token', status: 401 };
    }
}
