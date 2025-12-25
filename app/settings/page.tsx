
import { cookies } from 'next/headers';
import { userService } from '@/lib/services/userService';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

export default async function SettingsServerPage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value || (process.env.NODE_ENV === 'development' ? 'dev-mock-user' : '');

    // Fetch profile to get notification settings
    const profile = await userService.getUserProfile(userId);

    // Default to true or false depending on business rules if no profile/consent found?
    // Current logic in client was defaults to false/null if not found?
    // Client initialized boolean state to true. But `useEffect` set it to `data.user?.notificationConsent === true`.
    // If `notificationConsent` is undefined, it becomes false.
    // So default is false (opt-in) or true (opt-out)?
    // User model has `notificationConsent?: boolean`.

    const initialConsent = profile?.notificationConsent === true;

    return (
        <SettingsClient initialNotificationConsent={initialConsent} />
    );
}
