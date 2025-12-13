// app/api/auth/line/callback/route.ts
// LINE OAuth コールバック処理

import { NextRequest, NextResponse } from 'next/server';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      return NextResponse.json(
        { error: 'Missing authorization code' },
        { status: 400 }
      );
    }

    // TODO: LINE 認可サーバーへのトークン交換処理
    // 実装例（本来はバックエンド側で実行）:
    // const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     grant_type: 'authorization_code',
    //     code,
    //     redirect_uri: process.env.NEXT_PUBLIC_LINE_LOGIN_REDIRECT_URI!,
    //     client_id: process.env.LINE_LOGIN_CHANNEL_ID!,
    //     client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET!,
    //   }),
    // });

    // TODO: Access Token を使用して user info を取得
    // const userInfo = await fetch('https://api.line.me/v2/profile', {
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // });

    // ローカルテスト用: モック LINE User
    const mockLineUser = {
      lineUserId: `U_mock_${Date.now()}`,
      displayName: 'Test User',
      pictureUrl: 'https://via.placeholder.com/200',
    };

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    // Firestore にユーザーを保存または更新
    const userRef = doc(db, 'users', mockLineUser.lineUserId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        lineUserId: mockLineUser.lineUserId,
        displayName: mockLineUser.displayName,
        pictureUrl: mockLineUser.pictureUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      await setDoc(userRef, {
        updatedAt: new Date(),
      }, { merge: true });
    }

    // Firebase Custom Token を生成（実装には Cloud Functions が必要）
    // TODO: Cloud Functions で Custom Token を生成
    // const customToken = await generateCustomToken(mockLineUser.lineUserId);
    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/success?token=${customToken}`);

    // 一時的な成功レスポンス
    return NextResponse.json({
      success: true,
      user: mockLineUser,
      message: 'Mock LINE login successful. Custom token generation pending.',
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { error: 'OAuth callback failed' },
      { status: 500 }
    );
  }
}
