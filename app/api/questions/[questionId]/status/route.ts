import { NextRequest, NextResponse } from 'next/server';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/backend-auth';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ questionId: string }> }
) {
    try {
        const { questionId } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status || !['matching'].includes(status)) {
            // Currently only supporting 'matching' as per requirement, but extensible.
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const authResult = await verifyAuth(request);
        if (authResult.error) {
            return NextResponse.json({ error: authResult.error }, { status: authResult.status });
        }
        const userId = authResult.uid;

        if (!db) {
            return NextResponse.json({ error: 'Database not available' }, { status: 500 });
        }

        const questionRef = doc(db, 'questions', questionId);
        const questionDoc = await getDoc(questionRef);

        if (!questionDoc.exists()) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        const data = questionDoc.data();
        if (data.userId !== userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Update
        await updateDoc(questionRef, {
            status,
            updatedAt: new Date() // Use server timestamp ideally but Date is okay for now if matched with other code
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Status update failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
