
import { cookies } from 'next/headers';
import { userService } from '@/lib/services/userService';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-dynamic';

export default async function ProfileServerPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value || (process.env.NODE_ENV === 'development' ? 'dev-mock-user' : '');

    // Always fetch profile if userId exists (or mock).
    const profile = await userService.getUserProfile(userId);

    return (
        <ProfileClient initialProfile={profile} />
    );
}
