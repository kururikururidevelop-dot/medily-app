// app/api/auth/mock-login/route.ts
// ローカル開発用：モック LINE ログイン

import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { displayName = 'Test User' } = body;

    // モック LINE User ID 生成
    const mockLineUserId = `U_mock_${Date.now()}`;

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    // Firestore にユーザーを保存
    const userRef = doc(db, 'users', mockLineUserId);
    await setDoc(userRef, {
      lineUserId: mockLineUserId,
      displayName,
      pictureUrl: 'https://via.placeholder.com/200',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
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
