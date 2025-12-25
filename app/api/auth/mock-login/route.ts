// app/api/auth/mock-login/route.ts
// ローカル開発用：モック LINE ログイン

import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DEV_MOCK_USER, DEV_MOCK_TOKEN } from '@/lib/auth-constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const displayName = body.displayName || 'デモユーザー';
    const mockLineUserId = DEV_MOCK_USER;
    const mockToken = DEV_MOCK_TOKEN;

    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    // Firestore にユーザーを保存（固定 ID）
    const userRef = doc(db, 'users', mockLineUserId);
    await setDoc(userRef, {
      lineUserId: mockLineUserId,
      displayName,
      pictureUrl: 'https://via.placeholder.com/200',
      profileCompletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { merge: true });

    return NextResponse.json({
      success: true,
      userId: mockLineUserId,
      token: mockToken,
      displayName,
      user: {
        lineUserId: mockLineUserId,
        displayName,
      },
      message: 'Mock user created successfully.',
    });
  } catch (error) {
    console.error('Mock login error:', error);
    return NextResponse.json(
      { error: 'Mock login failed' },
      { status: 500 }
    );
  }
}
