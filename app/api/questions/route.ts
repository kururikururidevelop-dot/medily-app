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
      description,
      region,
      category,
      tags = [],
    } = body;

    if (!userId || !title || !description || !region || !category) {
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
      description,
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
    const answeredBy = searchParams.get('answeredBy');
    const region = searchParams.get('region');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const publicOnly = searchParams.get('public') === 'true';
    const limitStr = searchParams.get('limit');
    const pageStr = searchParams.get('page');
    const limitNum = limitStr ? Number(limitStr) : undefined;
    const pageNum = pageStr ? Math.max(1, Number(pageStr)) : 1;

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    const questionsRef = collection(db, 'questions');
    // クエリは index 依存を避けるためシンプルにし、詳細フィルタはメモリで実施
    const constraints = [] as any[];
    if (userId) {
      constraints.push(where('userId', '==', userId));
    } else if (publicOnly) {
      constraints.push(where('public', '==', true));
    }
    constraints.push(orderBy('createdAt', 'desc'));
    const q = query(questionsRef, ...constraints);

    const querySnapshot = await getDocs(q);
    let allQuestions = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Timestamp をフォーマット済み文字列に変換
        createdAt: data.createdAt ? (data.createdAt instanceof Timestamp ? data.createdAt.toDate().toLocaleString('ja-JP') : data.createdAt) : '',
        updatedAt: data.updatedAt ? (data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toLocaleString('ja-JP') : data.updatedAt) : '',
      };
    });

    // answeredBy が指定されている場合、その回答者が回答した質問のみに絞る
    if (answeredBy && db) {
      const questionIdsWithAnswers = new Set<string>();
      for (const question of allQuestions) {
        const answersRef = collection(db, 'questions', question.id, 'answers');
        const answersQuery = query(answersRef, where('userId', '==', answeredBy));
        const answersSnapshot = await getDocs(answersQuery);
        if (!answersSnapshot.empty) {
          questionIdsWithAnswers.add(question.id);
        }
      }
      allQuestions = allQuestions.filter((q) => questionIdsWithAnswers.has(q.id));
    }

    // 追加フィルタはメモリで実施（index 不足の 500 を避ける）
    if (region) {
      allQuestions = allQuestions.filter((qDoc) => qDoc.region === region);
    }
    if (category) {
      allQuestions = allQuestions.filter((qDoc) => qDoc.category === category);
    }
    if (status) {
      allQuestions = allQuestions.filter((qDoc) => qDoc.status === status);
    }

    let paged = allQuestions;
    if (typeof limitNum === 'number' && limitNum > 0) {
      const offset = (pageNum - 1) * limitNum;
      paged = allQuestions.slice(offset, offset + limitNum);
    }

    const hasMore = typeof limitNum === 'number' && limitNum > 0
      ? allQuestions.length > (pageNum * limitNum)
      : false;

    return NextResponse.json({ questions: paged, hasMore });
  } catch (error) {
    console.error('Get questions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
