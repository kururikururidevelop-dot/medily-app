import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/userService';
import { verifyAuth } from '@/lib/backend-auth';

export async function POST(req: NextRequest) {
    try {
        const { questionId } = await req.json();
        if (!questionId) {
            return NextResponse.json({ error: 'Missing questionId' }, { status: 400 });
        }

        const authResult = await verifyAuth(req);
        if (authResult.error) {
            return NextResponse.json({ error: authResult.error }, { status: authResult.status });
        }
        const userId = authResult.uid;
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized: No UID' }, { status: 401 });
        }

        const isAdded = await userService.toggleFavorite(userId, questionId);
        return NextResponse.json({ isAdded });
    } catch (error) {
        console.error('Failed to toggle favorite:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
