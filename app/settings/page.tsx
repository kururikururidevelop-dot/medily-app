
import { getServerAuthUser } from '@/lib/server-auth';
import { userService } from '@/lib/services/userService';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

export default async function SettingsServerPage() {
    const { userId } = await getServerAuthUser();

    return (
        <SettingsClient />
    );
}
