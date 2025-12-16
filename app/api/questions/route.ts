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
  getCountFromServer,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 質問投稿
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      title: rawTitle,
      description: rawDescription,
      body: rawBody,
      region: rawRegion,
      regionIds,
      category: rawCategory,
      categoryIds,
      tags = [],
    } = body;

    const title = (rawTitle || '').trim();
    const description = (rawDescription || rawBody || '').trim();
    const region = rawRegion || (Array.isArray(regionIds) ? regionIds[0] : undefined);
    const category = rawCategory || (Array.isArray(categoryIds) ? categoryIds[0] : undefined);

    if (!title || title.length > 60) {
      return NextResponse.json(
        { error: 'Title is required and must be 60 characters or fewer' },
        { status: 400 }
      );
    }

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
      content: description, // 互換フィールド
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
    const regionParams = searchParams.getAll('region').filter(Boolean);
    const categoryParams = searchParams.getAll('category').filter(Boolean);
    const statusParams = searchParams.getAll('status').filter(Boolean);
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
    let allQuestions = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        let answerCount = data.answerCount ?? 0;
        try {
          const countSnap = await getCountFromServer(
            collection(db, 'questions', doc.id, 'answers')
          );
          answerCount = countSnap.data().count;
        } catch (err) {
          console.warn('Failed to count answers for', doc.id, err);
        }

        return {
          id: doc.id,
          ...data,
          answerCount,
          // Timestamp をフォーマット済み文字列に変換
          createdAt: data.createdAt
            ? data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toLocaleString('ja-JP')
              : data.createdAt
            : '',
          updatedAt: data.updatedAt
            ? data.updatedAt instanceof Timestamp
              ? data.updatedAt.toDate().toLocaleString('ja-JP')
              : data.updatedAt
            : '',
        };
      })
    );

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
    if (regionParams.length > 0) {
      const regionSet = new Set(regionParams);
      allQuestions = allQuestions.filter((qDoc) => regionSet.has(qDoc.region));
    }
    if (categoryParams.length > 0) {
      const categorySet = new Set(categoryParams);
      allQuestions = allQuestions.filter((qDoc) => categorySet.has(qDoc.category));
    }
    if (statusParams.length > 0) {
      const statusSet = new Set(statusParams);
      allQuestions = allQuestions.filter((qDoc) => statusSet.has(qDoc.status));
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
