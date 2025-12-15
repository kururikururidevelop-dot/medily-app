import { cookies } from 'next/headers';
import HomeClient from './HomeClient';

// サーバー側で内部APIを呼び出す
async function fetchInitialData(userId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    console.log('[fetchInitialData] Starting for userId:', userId);
    
    // サマリーと各タブのデータを並列取得
    const [summaryRes, latestRes, myQuestionsRes, answeredRes] = await Promise.all([
      fetch(`${baseUrl}/api/users/summary?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/questions?userId=${encodeURIComponent(userId)}&limit=10&page=1`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/questions?userId=${encodeURIComponent(userId)}&limit=10&page=1`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/questions?answeredBy=${encodeURIComponent(userId)}&limit=10&page=1`, { cache: 'no-store' }),
    ]);

    const summary = summaryRes.ok ? await summaryRes.json() : { questions: 0, answeredQuestions: 0, answers: 0 };
    const latestData = latestRes.ok ? await latestRes.json() : { questions: [] };
    const myQuestionsData = myQuestionsRes.ok ? await myQuestionsRes.json() : { questions: [] };
    const answeredData = answeredRes.ok ? await answeredRes.json() : { questions: [] };

    console.log('[fetchInitialData] Summary:', summary);
    console.log('[fetchInitialData] Data counts - latest:', latestData.questions.length, 'myQuestions:', myQuestionsData.questions.length, 'answered:', answeredData.questions.length);

    return {
      summary,
      latest: latestData.questions || [],
      myQuestions: myQuestionsData.questions || [],
      answered: answeredData.questions || [],
    };
  } catch (error) {
    console.error('[fetchInitialData] Failed to fetch initial data:', error);
    if (error instanceof Error) {
      console.error('[fetchInitialData] Error details:', error.message, error.stack);
    }
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

  // 認証チェック（必要に応じて）
  // if (!userId) redirect('/auth/login');

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
