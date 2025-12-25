
import { getServerAuthUser } from '@/lib/server-auth';
import { userService } from '@/lib/services/userService';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-dynamic';

export default async function ProfileServerPage() {
    const { userId } = await getServerAuthUser();

    // Always fetch profile if userId exists (or mock).
    const profile = await userService.getUserProfile(userId);

    return (
        <ProfileClient initialProfile={profile} />
    );
}
