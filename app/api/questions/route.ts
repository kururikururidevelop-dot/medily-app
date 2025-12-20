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
      tags = [],
      parentQuestionId
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
      category,
      tags,
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
    if (!publicOnly) {
      // If fetching specific user's questions, verify ownership
      if (userId) {
        const authResult = await verifyAuth(request, userId);
        if (authResult.error) return NextResponse.json({ error: authResult.error }, { status: authResult.status });
      } else {
        // Generic private fetch? Should require at least a valid token
        const authResult = await verifyAuth(request);
        if (authResult.error) return NextResponse.json({ error: authResult.error }, { status: authResult.status });
      }
    }

    const filter: QuestionFilter = {
      userId,
      answeredBy: searchParams.get('answeredBy') || undefined,
      region: searchParams.getAll('region').filter(Boolean),
      category: searchParams.getAll('category').filter(Boolean),
      status: searchParams.getAll('status').filter(Boolean),
      publicOnly,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
    };

    const result = await questionService.getQuestions(filter);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get questions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

