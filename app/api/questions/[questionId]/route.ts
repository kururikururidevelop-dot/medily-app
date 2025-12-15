// app/api/questions/[questionId]/route.ts
// 質問詳細取得API

import { NextRequest, NextResponse } from 'next/server';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;
    console.log('[API] Fetching question:', questionId);

    if (!db) {
      console.error('[API] Firebase db is not configured');
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    console.log('[API] Firebase db is available');

    // 質問データを取得
    const questionRef = doc(db, 'questions', questionId);
    console.log('[API] Fetching question document...');
    const questionDoc = await getDoc(questionRef);
    console.log('[API] Question exists:', questionDoc.exists());

    if (!questionDoc.exists()) {
      return NextResponse.json(
        { error: '質問が見つかりません' },
        { status: 404 }
      );
    }

    const questionData = questionDoc.data();

    // 回答データを取得（サブコレクションから）
    const answersRef = collection(db, 'questions', questionId, 'answers');
    const answersQuery = query(
      answersRef,
      orderBy('createdAt', 'asc')
    );
    const answersSnapshot = await getDocs(answersQuery);

    const answers = answersSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate().toLocaleString('ja-JP') 
          : data.createdAt,
        updatedAt: data.updatedAt instanceof Timestamp 
          ? data.updatedAt.toDate().toLocaleString('ja-JP') 
          : data.updatedAt,
      };
    });

    // 親質問がある場合は取得
    let parentQuestion = null;
    if (questionData?.parentQuestionId) {
      const parentRef = doc(db, 'questions', questionData.parentQuestionId);
      const parentDoc = await getDoc(parentRef);
      
      if (parentDoc.exists()) {
        const parentData = parentDoc.data();
        parentQuestion = {
          id: parentDoc.id,
          ...parentData,
          createdAt: parentData.createdAt instanceof Timestamp 
            ? parentData.createdAt.toDate().toLocaleString('ja-JP') 
            : parentData.createdAt,
          updatedAt: parentData.updatedAt instanceof Timestamp 
            ? parentData.updatedAt.toDate().toLocaleString('ja-JP') 
            : parentData.updatedAt,
        };
      }
    }

    return NextResponse.json({
      question: {
        id: questionDoc.id,
        ...questionData,
        createdAt: questionData.createdAt instanceof Timestamp 
          ? questionData.createdAt.toDate().toLocaleString('ja-JP') 
          : questionData.createdAt,
        updatedAt: questionData.updatedAt instanceof Timestamp 
          ? questionData.updatedAt.toDate().toLocaleString('ja-JP') 
          : questionData.updatedAt,
      },
      answers,
      parentQuestion,
    });
  } catch (error) {
    console.error('[API] Failed to fetch question:', error);
    console.error('[API] Error details:', error instanceof Error ? error.message : String(error));
    console.error('[API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: '質問の取得に失敗しました', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
