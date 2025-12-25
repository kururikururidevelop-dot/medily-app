
import { getServerAuthUser } from '@/lib/server-auth';
import { cookies } from 'next/headers';
import HomeClient from './HomeClient';
import { userService } from '@/lib/services/userService';
import { questionService } from '@/lib/services/questionService';

// サーバー側で内部APIを呼び出す
async function fetchInitialData(
  userId: string,
  options: {
    mqPage: number;
    ansPage: number;
    favPage: number;
    mqStatus?: string[];
    mqCategories?: string[];
    mqKeyword?: string;
    ansStatus?: string[];
    ansCategories?: string[];
    ansKeyword?: string;
    favStatus?: string[];
    favCategories?: string[];
    favKeyword?: string;
  }
) {
  try {
    console.log('[fetchInitialData] Starting for userId:', userId, options);

    const myLimit = Math.max(1, options.mqPage) * 10;
    const ansLimit = Math.max(1, options.ansPage) * 10;
    const favLimit = Math.max(1, options.favPage) * 10;

    // Get updated favorites first (needed for Favorites Tab)
    const userFavoritesIds = await userService.getFavoriteQuestionIds(userId);

    // サマリーと各タブのデータを並列取得
    const [summary, userProfile, myQuestionsResult, answeredResult, favoritesResult] = await Promise.all([
      userService.getUserSummary(userId),
      userService.getUserProfile(userId),
      questionService.getQuestions({
        userId,
        limit: myLimit,
        page: 1,
        status: options.mqStatus,
        category: options.mqCategories,
        keyword: options.mqKeyword
      }),
      questionService.getQuestions({
        answeredBy: userId,
        limit: ansLimit,
        page: 1,
        status: options.ansStatus,
        category: options.ansCategories,
        keyword: options.ansKeyword
      }),
      // Favorites Tab Fetching
      userFavoritesIds.length > 0 ? questionService.getQuestions({
        ids: userFavoritesIds,
        limit: favLimit,
        page: 1,
        status: options.favStatus,
        category: options.favCategories,
        keyword: options.favKeyword
      }) : Promise.resolve({ questions: [], hasMore: false })
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

    return {
      summary,
      userProfile,
      userRank: userProfile?.rank || 0,
      myQuestions: myQuestionsResult.questions,
      myHasMore: myQuestionsResult.hasMore,
      answered: answeredResult.questions,
      ansHasMore: answeredResult.hasMore,
      favorites: favoritesResult.questions,
      favHasMore: favoritesResult.hasMore,
      userFavoritesIds,
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
      favorites: [],
      favHasMore: false,
      userFavoritesIds: [],
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

  console.log('[HomePage] SearchParams:', sp);
  console.log('[HomePage] Resolved Tab:', tab);

  const mqPage = typeof sp?.mq_page === 'string' ? parseInt(sp.mq_page) || 1 : 1;
  const ansPage = typeof sp?.ans_page === 'string' ? parseInt(sp.ans_page) || 1 : 1;
  const favPage = typeof sp?.fav_page === 'string' ? parseInt(sp.fav_page) || 1 : 1;

  // Independent Keywords
  const mqKeyword = typeof sp?.mq_kw === 'string' ? sp.mq_kw : undefined;
  const ansKeyword = typeof sp?.ans_kw === 'string' ? sp.ans_kw : undefined;
  const favKeyword = typeof sp?.fav_kw === 'string' ? sp.fav_kw : undefined;

  const mqStatus = parseArray(sp?.mq_status);
  const mqCategories = parseArray(sp?.mq_cats);
  const ansStatus = parseArray(sp?.ans_status);
  const ansCategories = parseArray(sp?.ans_cats);

  // New Favorites Filters
  const favStatus = parseArray(sp?.fav_status);
  const favCategories = parseArray(sp?.fav_cats);

  const { userId } = await getServerAuthUser();
  const cookieStore = await cookies();
  const displayName = cookieStore.get('displayName')?.value || 'デモユーザー';
  const avatarUrl = cookieStore.get('avatarUrl')?.value;

  // サーバー側で初期データ取得
  const [initialData, categories, statuses] = await Promise.all([
    fetchInitialData(userId, {
      mqPage,
      ansPage,
      favPage,
      mqStatus,
      mqCategories,
      mqKeyword,
      ansStatus,
      ansCategories,
      ansKeyword,
      favStatus,
      favCategories,
      favKeyword
    }),
    masterService.getMasters('category'),
    masterService.getMasters('status')
  ]);

  console.log('[HomePage] Fetched categories:', categories.length);
  console.log('[HomePage] Fetched statuses:', statuses.length);

  const {
    summary,
    userRank,
    myQuestions,
    answered,
    favorites,
    userProfile,
    thankers,
    myHasMore,
    ansHasMore,
    favHasMore,
    userFavoritesIds
  } = initialData;

  // CookieよりFirestoreの最新プロフィール画像を優先
  const finalAvatarUrl = userProfile?.pictureUrl || userProfile?.avatar || avatarUrl;

  return (
    <HomeClient
      initialData={{ myQuestions, answered, favorites }}
      initialMeta={{
        'my-questions': { page: mqPage, hasMore: myHasMore },
        'answered': { page: ansPage, hasMore: ansHasMore },
        'favorites': { page: favPage, hasMore: favHasMore }
      }}
      initialTab={tab as 'my-questions' | 'answered' | 'favorites'}
      summary={summary}
      userName={displayName}
      userId={userId}
      avatarUrl={finalAvatarUrl}
      userRank={userRank}
      initialCategories={categories}
      initialStatuses={statuses}
      thankers={thankers}
      initialFavorites={userFavoritesIds}
      initialFilters={{
        'my-questions': { keyword: mqKeyword || '', status: mqStatus, categories: mqCategories },
        'answered': { keyword: ansKeyword || '', status: ansStatus, categories: ansCategories },
        'favorites': { keyword: favKeyword || '', status: favStatus, categories: favCategories }
      }}
    />
  );
}
