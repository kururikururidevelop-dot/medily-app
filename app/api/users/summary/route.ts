// app/api/users/summary/route.ts
// ユーザーの質問・回答件数サマリー取得

import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  collectionGroup,
  getCountFromServer,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }
    if (!db) {
      return NextResponse.json({ error: 'Firebase is not configured' }, { status: 500 });
    }

    // 自分の質問件数
    const questionsRef = collection(db, 'questions');
    const qAll = query(questionsRef, where('userId', '==', userId));
    const qAnswered = query(questionsRef, where('userId', '==', userId), where('status', '==', 'answered'));

    const [allQuestionsSnap, answeredQuestionsSnap] = await Promise.all([
      getCountFromServer(qAll),
      getCountFromServer(qAnswered),
    ]);

    // 自分が回答した件数（collection group で answers を横断）
    const answersGroup = collectionGroup(db, 'answers');
    const answersByMe = query(answersGroup, where('userId', '==', userId));
    const answersSnap = await getCountFromServer(answersByMe);

    return NextResponse.json({
      questions: allQuestionsSnap.data().count,
      answeredQuestions: answeredQuestionsSnap.data().count,
      answers: answersSnap.data().count,
    });
  } catch (error) {
    console.error('[API] summary error:', error);
    return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 });
  }
}