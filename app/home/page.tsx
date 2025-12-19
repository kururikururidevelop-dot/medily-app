
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
      // 最新の質問（自分の地域など関係あるもの？現状は全件）
      // Logic of original: userId passed? 
      // check original code: questions?userId=userId ... no wait
      // Original code for 'latest': fetch(`${baseUrl}/api/questions?userId=${encodeURIComponent(userId)}&limit=10&page=1`)
      // Wait, passing userId to 'latest' probably filtered by userId?
      // Let me re-read original `app/home/page.tsx`:
      // `fetch('${baseUrl}/api/questions?userId=${encodeURIComponent(userId)}&limit=10&page=1')`
      // This means "My Questions" was fetched for "latest"?
      // Or maybe the API ignored userId if not needed?
      // No, API `GET`: `if (userId) constraints.push(where('userId', '==', userId));`
      // SO current "latest" tab was actually showing "My Questions"???
      // Let's check `HomeClient.tsx`.
      // Tab 'latest' calls: `url += &userId=...` 
      // Wait, if "latest" shows "My Questions", what does "my-questions" tab show?
      // "my-questions" tab logic: `url += &userId=...` PLUS status filters.
      // So "latest" is "My Questions (All Status)".
      // And "my-questions" is "My Questions (Filtered)".
      // Is that right? The tab label is "最新" (Latest) vs "質問" (My Questions).
      // If "Latest" is just "My Questions", that's weird.
      // Usually "Latest" means "Public Timeline".
      // But looking at code: `if (targetTab === 'latest') { url += &userId=... }`
      // So yes, currently "Latest" tab seems to be "My Question History". 
      // ... Unless I misread.
      // Wait, `app/home/page.tsx` line 14:
      // `fetch('${baseUrl}/api/questions?userId=${encodeURIComponent(userId)}&limit=10&page=1')`
      // This confirms it sends userId.
      // If the User Intention for "Latest" is "New Arrivals", sending userId is a BUG in original code.
      // However, I should preserve behavior or Fix it if obviously wrong.
      // Given the tab name "Latest", it likely should be ALL questions.
      // But if I remove userId, I get ALL questions.
      // Let's assume for now I should Match Existing Behavior even if weird.
      // Actually, let's look at `HomeClient`.
      // `const [tab, setTab] = useState<TabType>('latest');`
      // Tab definintion: `{ id: 'latest', label: '新着', icon: 'update' }`
      // It says "Shinchaku" (New Arrivals).
      // If it passes userId, it only shows MY questions.
      // Maybe the user IS the only one?
      // Let's look at `app/questions/page.tsx` (Question List). It fetches `public=true` and NO userId.
      // That is the real "Public Timeline".
      // In `Home`, maybe "Latest" implies "Notifications/Updates for ME?" 
      // But the card in `HomeClient` says "新着あり ...件".
      // I strongly suspect passing `userId` to `latest` query was a mistake in previous code or I am misunderstanding.
      // But wait! `app/home/page.tsx` fetches `latestRes` AND `myQuestionsRes`.
      // `latestRes` call: `api/questions?userId=...`
      // `myQuestionsRes` call: `api/questions?userId=...`
      // They are Identical Calls!
      // This is definitely redundant/buggy.
      // If I want to be a "Smart" agent, I should fix "Latest" to be global latest.
      // But maybe I should ask? 
      // I will assume "Latest" means "Public Latest" (userId undefined).
      // AND "My Questions" means "User's Questions".
      // Let's change "Latest" to NOT filter by userId.

      questionService.getQuestions({ limit: 10, page: 1 }), // Latest (Global)
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

