// app/api/questions/[questionId]/siblings/route.ts
// 前後の質問ID取得API

import { NextRequest, NextResponse } from 'next/server';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { verifyAuth } from '@/lib/backend-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;
    console.log('[API Siblings] Fetching siblings for:', questionId);

    // Security Check
    const authResult = await verifyAuth(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    if (!db) {
      console.error('[API Siblings] Firebase db is not configured');
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    // 現在の質問を取得
    const currentRef = doc(db, 'questions', questionId);
    const currentDoc = await getDoc(currentRef);

    if (!currentDoc.exists()) {
      return NextResponse.json(
        { error: '質問が見つかりません' },
        { status: 404 }
      );
    }

    const currentData = currentDoc.data();

    // 前の質問 = 親質問（parentQuestionId）
    const prevQuestionId = currentData?.parentQuestionId || null;

    // 次の質問 = 現在の質問を親とする追加質問
    let nextQuestionId = null;
    const questionsRef = collection(db, 'questions');
    const nextQuery = query(
      questionsRef,
      where('parentQuestionId', '==', questionId),
      limit(1)
    );
    const nextSnapshot = await getDocs(nextQuery);

    if (!nextSnapshot.empty) {
      nextQuestionId = nextSnapshot.docs[0].id;
    }

    return NextResponse.json({
      prevQuestionId,
      nextQuestionId,
    });
  } catch (error) {
    console.error('[API Siblings] Failed to fetch siblings:', error);
    console.error('[API Siblings] Error details:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: '前後の質問の取得に失敗しました', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
