// app/api/questions/route.ts
// 質問投稿・取得 API

import { NextRequest, NextResponse } from 'next/server';
import { questionService, QuestionFilter } from '@/lib/services/questionService';
import { verifyAuth } from '@/lib/backend-auth';

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
      // tags = [], // CreateQuestion drops tags
      choices = [],
      isPublic: rawIsPublic,
      public: rawPublic, // Support both
      genderFilter,
      ageGroups,
      parentQuestionId
    } = body;

    const title = (rawTitle || '').trim();
    const description = (rawDescription || rawBody || '').trim();

    // Region Logic: Prefer 'region' string, fallback to first of `regionIds`
    const region = rawRegion || (Array.isArray(regionIds) && regionIds.length > 0 ? regionIds[0] : undefined);

    // Category Logic: Prefer `categories` or `categoryIds` (array). Fallback to `category` (string) as single item array.
    let categories: string[] = [];
    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
      categories = categoryIds;
    } else if (rawCategory) {
      categories = [rawCategory];
    }

    if (!title || title.length > 60) {
      return NextResponse.json(
        { error: 'Title is required and must be 60 characters or fewer' },
        { status: 400 }
      );
    }

    if (!userId || !title || !description || !region || categories.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const isPublic = rawIsPublic !== undefined ? rawIsPublic : (rawPublic !== undefined ? rawPublic : true);

    // Security Check
    const authResult = await verifyAuth(request, userId);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const questionId = await questionService.createQuestion({
      userId,
      title,
      description,
      region,
      categories,
      choices,
      isPublic,
      genderFilter,
      ageGroups,
      parentQuestionId
    });

    return NextResponse.json({
      success: true,
      questionId,
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
    const publicOnly = searchParams.get('public') === 'true';
    const userId = searchParams.get('userId') || undefined;

    // Security Check: If not explicitly requesting public data, or if requesting specific user data, enforce auth
    // Security Check: If not explicitly requesting public data, or if requesting specific user data, enforce auth
    if (!publicOnly) {
      // If fetching specific user's questions OR questions answered by specific user, verify ownership
      // This ensures you can only query "my questions" or "questions I answered" without public=true
      const targetUser = userId || searchParams.get('answeredBy');

      if (targetUser) {
        const authResult = await verifyAuth(request, targetUser);
        if (authResult.error) return NextResponse.json({ error: authResult.error }, { status: authResult.status });
      } else {
        // Generic private fetch? Should require at least a valid token
        const authResult = await verifyAuth(request);
        if (authResult.error) return NextResponse.json({ error: authResult.error }, { status: authResult.status });
      }
    }

    const limitParam = parseInt(searchParams.get('limit') || '10', 10);
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const regions = searchParams.getAll('region');
    const categories = searchParams.getAll('category');
    const statuses = searchParams.getAll('status');
    const keyword = searchParams.get('keyword') || undefined;
    const excludeUserId = searchParams.get('excludeUserId') || undefined;

    console.log('[API] GET /questions params:', {
      limit: limitParam,
      page: pageParam,
      keyword,
      excludeUserId,
      regions,
      categories
    });

    const result = await questionService.getQuestions({
      userId,
      answeredBy: searchParams.get('answeredBy') || undefined,
      publicOnly,
      limit: limitParam,
      page: pageParam,
      region: regions.length > 0 ? regions : undefined,
      category: categories.length > 0 ? categories : undefined,
      status: statuses.length > 0 ? statuses : undefined,
      keyword,
      excludeUserId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get questions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

