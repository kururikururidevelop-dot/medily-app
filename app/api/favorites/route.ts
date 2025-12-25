import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/userService';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const { questionId } = await req.json();
        if (!questionId) {
            return NextResponse.json({ error: 'Missing questionId' }, { status: 400 });
        }

        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value || (process.env.NODE_ENV === 'development' ? 'dev-mock-user' : '');

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const isAdded = await userService.toggleFavorite(userId, questionId);
        return NextResponse.json({ isAdded });
    } catch (error) {
        console.error('Failed to toggle favorite:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
