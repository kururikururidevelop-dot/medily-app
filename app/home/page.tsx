
import { cookies } from 'next/headers';
import HomeClient from './HomeClient';
import { userService } from '@/lib/services/userService';
import { questionService } from '@/lib/services/questionService';

// サーバー側で内部APIを呼び出す
async function fetchInitialData(userId: string) {
  try {
    console.log('[fetchInitialData] Starting for userId:', userId);

    // サマリーと各タブのデータを並列取得
    const [summary, latest, myQuestionsResult, answeredResult] = await Promise.all([
      userService.getUserSummary(userId),
      // User Requirement: Latest tab must ONLY show own questions.
      questionService.getQuestions({ userId, limit: 10, page: 1 }), // Latest (Filtered by User)
      questionService.getQuestions({ userId, limit: 10, page: 1 }), // My Questions
      questionService.getQuestions({ answeredBy: userId, limit: 10, page: 1 }),
    ]);

    console.log('[fetchInitialData] Summary:', summary);
    // console.log('[fetchInitialData] Data counts - latest:', latest.questions.length, 'myQuestions:', myQuestionsResult.questions.length, 'answered:', answeredResult.questions.length);

    return {
      summary,
      latest: latest.questions,
      myQuestions: myQuestionsResult.questions,
      answered: answeredResult.questions,
    };
  } catch (error) {
    console.error('[fetchInitialData] Failed to fetch initial data:', error);
    return {
      summary: { questions: 0, answeredQuestions: 0, answers: 0 },
      latest: [],
      myQuestions: [],
      answered: [],
    };
  }
}

export default async function HomePage() {
  // サーバー側で認証チェックとデータ取得
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value || 'dev-mock-user';
  const displayName = cookieStore.get('displayName')?.value || 'デモユーザー';
  const avatarUrl = cookieStore.get('avatarUrl')?.value;

  // サーバー側で初期データ取得
  const { summary, latest, myQuestions, answered } = await fetchInitialData(userId);

  return (
    <HomeClient
      initialData={{ latest, myQuestions, answered }}
      summary={summary}
      userName={displayName}
      userId={userId}
      avatarUrl={avatarUrl}
    />
  );
}

