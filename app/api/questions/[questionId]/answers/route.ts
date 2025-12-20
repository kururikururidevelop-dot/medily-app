// app/api/questions/[questionId]/answers/route.ts
// 回答投稿・取得 API

import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/backend-auth';

// 回答投稿
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;
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

    // 回答を投稿
    const answersRef = collection(db, 'questions', questionId, 'answers');
    const docRef = await addDoc(answersRef, {
      userId,
      content,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    // 質問の answerCount をインクリメント
    const questionRef = doc(db, 'questions', questionId);
    await updateDoc(questionRef, {
      answerCount: increment(1),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      answerId: docRef.id,
      message: 'Answer posted successfully.',
    });
  } catch (error) {
    console.error('Answer posting error:', error);
    return NextResponse.json(
      { error: 'Failed to post answer' },
      { status: 500 }
    );
  }
}

// 回答一覧取得
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;

    // Security Check
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }
    const answersRef = collection(db, 'questions', questionId, 'answers');
    const q = query(answersRef, orderBy('createdAt', 'asc'));

    const querySnapshot = await getDocs(q);
    const answers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ answers });
  } catch (error) {
    console.error('Get answers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch answers' },
      { status: 500 }
    );
  }
}
