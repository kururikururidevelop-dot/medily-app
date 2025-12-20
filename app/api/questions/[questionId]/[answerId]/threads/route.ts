// app/api/questions/[questionId]/[answerId]/threads/route.ts
// スレッド（ラリー）API

import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/backend-auth';

const MAX_RALLY = 5;

// ラリーを追加
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string; answerId: string }> }
) {
  const { questionId, answerId } = await params;
  try {
    const body = await request.json();
    const { userId, content } = body;

    if (!userId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Security Check
    const authResult = await verifyAuth(request, userId);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    // スレッド情報を確認
    const threadRef = doc(db, 'questions', questionId, 'threads', answerId);
    const threadDoc = await doc(db, 'questions', questionId, 'threads', answerId);

    // ラリーを追加
    const ralliesRef = collection(db, 'questions', questionId, 'threads', answerId, 'rallies');
    const rallyDocRef = await addDoc(ralliesRef, {
      userId,
      content,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      rallyId: rallyDocRef.id,
      message: 'Rally added successfully.',
    });
  } catch (error) {
    console.error('Add rally error:', error);
    return NextResponse.json(
      { error: 'Failed to add rally' },
      { status: 500 }
    );
  }
}

// ラリー一覧取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string; answerId: string }> }
) {
  try {
    const { questionId, answerId } = await params;

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    const ralliesRef = collection(
      db,
      'questions',
      questionId,
      'threads',
      answerId,
      'rallies'
    );
    const q = query(ralliesRef, orderBy('createdAt', 'asc'));

    const querySnapshot = await getDocs(q);
    const rallies = querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    return NextResponse.json({ rallies });
  } catch (error) {
    console.error('Get rallies error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rallies' },
      { status: 500 }
    );
  }
}
