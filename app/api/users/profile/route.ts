// app/api/users/profile/route.ts
// ユーザープロフィール登録/更新 API

import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/userService';

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

    // Validation: userId is mandatory.
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    if (displayName && displayName.length > 20) {
      return NextResponse.json(
        { error: 'Nickname must be 20 characters or less' },
        { status: 400 }
      );
    }

    // Construct update data carefully to avoid undefined values overrides or Firestore errors
    const updateData: any = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (region !== undefined) updateData.region = region;
    if (categories !== undefined) {
      updateData.categories = Array.isArray(categories) ? categories : [];
    } else if (category !== undefined) {
      updateData.categories = [category];
    }
    if (medicalBackground !== undefined) updateData.medicalBackground = medicalBackground;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (typeof notificationConsent === 'boolean') updateData.notificationConsent = notificationConsent;

    await userService.updateUserProfile(userId, updateData);

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

    const user = await userService.getUserProfile(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

