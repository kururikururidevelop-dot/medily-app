import { cookies } from 'next/headers';

import { DEV_MOCK_USER } from '@/lib/auth-constants';

interface ServerAuthUser {
    userId: string;
}

/**
 * Retrieves the authenticated user for Server Components.
 * In development, checks environment and returns 'dev-mock-user' if applicable.
 * Returns an empty string if no user is found.
 */
export async function getServerAuthUser(): Promise<ServerAuthUser> {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    if (userId) {
        return { userId };
    }

    // Development Fallback
    if (process.env.NODE_ENV === 'development') {
        return { userId: DEV_MOCK_USER };
    }

    return { userId: '' };
}
