import { auth } from '@/lib/firebase';
import { DEV_MOCK_USER } from '@/lib/auth-constants';

interface AuthenticatedUser {
    userId: string;
    token: string;
}

/**
 * Retrieves the authenticated user.
 * In development, falls back to 'dev-mock-user' from localStorage if valid.
 * Throws an error if not authenticated.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
    await auth?.authStateReady();
    const user = auth?.currentUser;

    if (user) {
        const token = await user.getIdToken();
        return { userId: user.uid, token };
    }

    // Development Fallback
    if (process.env.NODE_ENV === 'development') {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId === DEV_MOCK_USER) {
                return { userId: storedUserId, token: '' };
            }
        }
    }

    throw new Error('認証されていません');
}

/**
 * Returns headers with Authorization token (if available) and Content-Type.
 * Useful for fetch requests.
 */
export async function getAuthHeaders(): Promise<HeadersInit> {
    const { token } = await getAuthenticatedUser();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}
