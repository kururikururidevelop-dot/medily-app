
import { cookies } from 'next/headers';
import HomeClient from './HomeClient';
import { userService } from '@/lib/services/userService';
import { questionService } from '@/lib/services/questionService';

// サーバー側で内部APIを呼び出す
// サーバー側で内部APIを呼び出す
async function fetchInitialData(
  userId: string,
  options: {
    mqPage: number;
    ansPage: number;
    mqStatus?: string[];
    mqCategories?: string[];
    ansStatus?: string[];
    ansCategories?: string[];
  }
) {
  try {
    console.log('[fetchInitialData] Starting for userId:', userId, options);

    const myLimit = Math.max(1, options.mqPage) * 10;
    const ansLimit = Math.max(1, options.ansPage) * 10;

    // サマリーと各タブのデータを並列取得
    const [summary, userProfile, myQuestionsResult, answeredResult] = await Promise.all([
      userService.getUserSummary(userId),
      userService.getUserProfile(userId),
      questionService.getQuestions({
        userId,
        limit: myLimit,
        page: 1,
        status: options.mqStatus,
        category: options.mqCategories
      }),
      questionService.getQuestions({
        answeredBy: userId,
        limit: ansLimit,
        page: 1,
        status: options.ansStatus,
        category: options.ansCategories
      }),
    ]);


    console.log('[fetchInitialData] Summary:', summary);

    // Filter Unique Thankers (Questioners)
    const seenUserIds = new Set<string>();
    const thankerIds: string[] = [];
    for (const q of answeredResult.questions) {
      if (q.userId !== userId && !seenUserIds.has(q.userId)) {
        seenUserIds.add(q.userId);
        thankerIds.push(q.userId);
        if (thankerIds.length >= 12) break;
      }
    }

    // Fetch Thanker Profiles
    const thankers = (await Promise.all(thankerIds.map(id => userService.getUserProfile(id))))
      .filter((u): u is NonNullable<typeof u> => u !== null);

    // hasMore logic needs to optionally returned?
    // Client calculates hasMore based on returned count usually.
    // If returned count < limit, then hasMore is false.
    // But getQuestions returns `hasMore` boolean in response structure?
    // questionService.getQuestions returns `{ questions: [], hasMore: boolean } `.
    // I should pass this through if possible, or Client infers it.
    // Current HomeClient uses `dataJson.hasMore`.
    // I should pass it.

    return {
      summary,
      userProfile,
      userRank: userProfile?.rank || 0,
      myQuestions: myQuestionsResult.questions,
      myHasMore: myQuestionsResult.hasMore,
      answered: answeredResult.questions,
      ansHasMore: answeredResult.hasMore,
      thankers,
    };
  } catch (error) {
    console.error('[fetchInitialData] Failed to fetch initial data:', error);
    return {
      summary: { questions: 0, answeredQuestions: 0, answers: 0 },
      userProfile: null,
      userRank: 0,
      myQuestions: [],
      myHasMore: false,
      answered: [],
      ansHasMore: false,
      thankers: [],
    };
  }
}

import { masterService } from '@/lib/services/masterService';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: Props) {
  const sp = await searchParams;

  const parseArray = (val: string | string[] | undefined): string[] => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  };

  // Parse Query Params
  const tab = typeof sp?.tab === 'string' ? sp.tab : 'my-questions';
  const mqPage = typeof sp?.mq_page === 'string' ? parseInt(sp.mq_page) || 1 : 1;
  const ansPage = typeof sp?.ans_page === 'string' ? parseInt(sp.ans_page) || 1 : 1;

  const mqStatus = parseArray(sp?.mq_status);
  const mqCategories = parseArray(sp?.mq_cats);
  const ansStatus = parseArray(sp?.ans_status);
  const ansCategories = parseArray(sp?.ans_cats);

  // サーバー側で認証チェックとデータ取得
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value || 'dev-mock-user';
  const displayName = cookieStore.get('displayName')?.value || 'デモユーザー';
  const avatarUrl = cookieStore.get('avatarUrl')?.value;

  // サーバー側で初期データ取得
  const [initialData, categories, statuses] = await Promise.all([
    fetchInitialData(userId, { mqPage, ansPage, mqStatus, mqCategories, ansStatus, ansCategories }),
    masterService.getMasters('category'),
    masterService.getMasters('status')
  ]);

  console.log('[HomePage] Fetched categories:', categories.length);
  console.log('[HomePage] Fetched statuses:', statuses.length);

  const { summary, userRank, myQuestions, answered, userProfile, thankers, myHasMore, ansHasMore } = initialData;

  // CookieよりFirestoreの最新プロフィール画像を優先
  const finalAvatarUrl = userProfile?.pictureUrl || userProfile?.avatar || avatarUrl;

  return (
    <HomeClient
      initialData={{ myQuestions, answered }}
      initialMeta={{
        'my-questions': { page: mqPage, hasMore: myHasMore },
        'answered': { page: ansPage, hasMore: ansHasMore }
      }}
      initialTab={tab as 'my-questions' | 'answered'}
      summary={summary}
      userName={displayName}
      userId={userId}
      avatarUrl={finalAvatarUrl}
      userRank={userRank}
      initialCategories={categories}
      initialStatuses={statuses}
      thankers={thankers}
    />
  );
}

