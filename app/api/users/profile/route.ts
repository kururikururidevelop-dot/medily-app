// app/api/users/profile/route.ts
// ユーザープロフィール登録/更新 API

import { NextRequest, NextResponse } from 'next/server';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      displayName,
      region,
      category, // 互換用（primaryCategory）
      categories, // 複数カテゴリ
      medicalBackground,
      avatar,
      notificationConsent,
    } = body;

    if (!userId || !displayName || !region) {
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

    // ユーザードキュメント更新
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        displayName,
        region,
        // 旧フィールドの互換保持
        primaryCategory: category || (Array.isArray(categories) && categories.length > 0 ? categories[0] : undefined),
        // 複数カテゴリ（新仕様）
        categories: Array.isArray(categories) ? categories : (category ? [category] : []),
        medicalBackground: medicalBackground || '',
        avatar: avatar || '',
        notificationConsent: typeof notificationConsent === 'boolean' ? notificationConsent : undefined,
        profileCompletedAt: new Date(),
        updatedAt: new Date(),
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Profile registered successfully.',
    });
  } catch (error) {
    console.error('Profile registration error:', error);
    return NextResponse.json(
      { error: 'Profile registration failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    if (!db) {
      return NextResponse.json(
        { error: 'Firebase is not configured' },
        { status: 500 }
      );
    }

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: userSnap.data() });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
