'use server';

import { userService } from '@/lib/services/userService';

// Server Action to update user rank
export async function updateUserRank(userId: string, newRank: number) {
    if (!userId) throw new Error('UserId is required');
    console.log(`[ServerAction] Updating rank for user ${userId} to ${newRank}`);
    try {
        await userService.updateUserProfile(userId, { rank: newRank });
        return { success: true };
    } catch (error) {
        console.error('[ServerAction] Failed to update rank:', error);
        return { success: false, error: 'Failed to update rank' };
    }
}
