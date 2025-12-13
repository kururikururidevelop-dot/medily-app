// app/api/questions/route.ts
// 質問投稿・取得 API

import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 質問投稿
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      title,
      content,
      region,
      category,
      tags = [],
    } = body;

    if (!userId || !title || !content || !region || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    const questionsRef = collection(db, 'questions');
    const docRef = await addDoc(questionsRef, {
      userId,
      title,
      content,
      region,
      category,
      tags,
      status: 'open', // open | answered | closed
      answerCount: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({
      success: true,
      questionId: docRef.id,
      message: 'Question posted successfully.',
    });
  } catch (error) {
    console.error('Question posting error:', error);
    return NextResponse.json(
      { error: 'Failed to post question' },
      { status: 500 }
    );
  }
}

// 質問一覧取得
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const region = searchParams.get('region');
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'open';

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    let q;
    const questionsRef = collection(db, 'questions');

    if (userId) {
      // ユーザーの質問一覧
      q = query(
        questionsRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    } else if (region && category) {
      // マッチング対象（地域 + カテゴリ）
      q = query(
        questionsRef,
        where('region', '==', region),
        where('category', '==', category),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      // すべての質問（最新順）
      q = query(questionsRef, orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Get questions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
