'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ContributionGraphic from '@/components/ContributionGraphic';
import ThankCount from '@/components/ThankCount';
import ContributionCategory from '@/components/ContributionCategory';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface Question {
  id: string;
  title: string;
  description: string;
  category: string;
  authorName: string;
  createdAt: string;
  answerCount: number;
  status?: string; // 'open' | 'answered' | 'closed'
}

type TabType = 'latest' | 'my-questions' | 'answered';

const CATEGORIES = ['医学', '栄養', '心理', '運動', 'その他'];

export default function HomePage() {
  useRequireAuth();

  const [tab, setTab] = useState<TabType>('latest');
  const [data, setData] = useState<Record<TabType, Question[]>>({ latest: [], 'my-questions': [], answered: [] });
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<Record<TabType, number>>({ latest: 1, 'my-questions': 1, answered: 1 });
  const [hasMore, setHasMore] = useState<Record<TabType, boolean>>({ latest: true, 'my-questions': true, answered: true });
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [questionStatus, setQuestionStatus] = useState<string>('all');
  const [questionCategory, setQuestionCategory] = useState<string>('all');
  const [answerStatus, setAnswerStatus] = useState<string>('all');
  const [answerCategory, setAnswerCategory] = useState<string>('all');

  // ユーザー名と ID を取得
  useEffect(() => {
    const displayName = localStorage.getItem('displayName');
    const storedUserId = localStorage.getItem('userId');
    const storedAvatar = localStorage.getItem('avatarUrl');

    // 開発用：userId がない場合はデモユーザーを設定
    if (!storedUserId || storedUserId === 'undefined') {
      localStorage.setItem('userId', 'dev-mock-user');
      setUserId('dev-mock-user');
      if (!displayName || displayName === 'undefined') {
        localStorage.setItem('displayName', 'デモユーザー');
        setUserName('デモユーザー');
      }
    } else {
      setUserId(storedUserId);
    }

    if (displayName && displayName !== 'undefined') {
      setUserName(displayName);
    }
    if (storedAvatar && storedAvatar !== 'undefined') {
      setAvatarUrl(storedAvatar);
    }

    // displayName が無い場合はプロフィール API から取得
    if (!displayName && storedUserId && storedUserId !== 'undefined') {
      let aborted = false;
      const fetchProfile = async () => {
        try {
          const res = await fetch(`/api/users/profile?userId=${storedUserId}`);
          if (!res.ok) return;
          const data = await res.json();
          const name = data?.user?.displayName;
          const avatar = data?.user?.avatar;
          if (name && !aborted) {
            setUserName(name);
            localStorage.setItem('displayName', name);
          }
          if (avatar && !aborted) {
            setAvatarUrl(avatar);
            localStorage.setItem('avatarUrl', avatar);
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        }
      };

      fetchProfile();
      return () => {
        aborted = true;
      };
    }
  }, []);

  // 質問データ取得
  const fetchQuestions = useCallback(
    async (targetTab: TabType, pageNum: number) => {
      setLoading(true);
      try {
        let url = `/api/questions?limit=10&page=${pageNum}`;
        if (targetTab === 'latest') {
          url += `&public=true&status=open`;
        } else if (targetTab === 'my-questions') {
          // 開発用：userId がない場合はデモユーザーで取得
          const effectiveUserId = userId && userId !== 'undefined' ? userId : 'dev-mock-user';
          url += `&userId=${encodeURIComponent(effectiveUserId)}`;
          if (questionStatus !== 'all') url += `&status=${encodeURIComponent(questionStatus)}`;
          if (questionCategory !== 'all') url += `&category=${encodeURIComponent(questionCategory)}`;
        } else if (targetTab === 'answered') {
          // 自分が回答した質問を取得
          const effectiveUserId = userId && userId !== 'undefined' ? userId : 'dev-mock-user';
          url += `&answeredBy=${encodeURIComponent(effectiveUserId)}`;
          if (answerStatus !== 'all') url += `&status=${encodeURIComponent(answerStatus)}`;
          if (answerCategory !== 'all') url += `&category=${encodeURIComponent(answerCategory)}`;
        }

        console.log('[fetchQuestions]', targetTab, url);
        const response = await fetch(url);
        if (!response.ok) throw new Error('質問の取得に失敗しました');

        const dataJson = await response.json();
        setData((prev) => {
          const base = pageNum === 1 ? [] : prev[targetTab] ?? [];
          const nextList = pageNum === 1 ? dataJson.questions : [...base, ...dataJson.questions];
          return { ...prev, [targetTab]: nextList };
        });
        const limitSize = 10;
        const nextHasMore = dataJson.hasMore ?? (dataJson.questions?.length >= limitSize);
        setHasMore((prev) => ({ ...prev, [targetTab]: nextHasMore }));
        setPages((prev) => ({ ...prev, [targetTab]: pageNum }));
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      } finally {
        setLoading(false);
      }
    },
    [answerCategory, answerStatus, questionCategory, questionStatus, userId],
  );

  // タブ切り替え時のデータ取得
  useEffect(() => {
    console.log('[useEffect tab change]', tab, 'userId:', userId);
    fetchQuestions(tab, 1);
  }, [tab]);

  // フィルタ変更時の再取得
  useEffect(() => {
    if (tab === 'my-questions') {
      console.log('[useEffect filter change] my-questions', questionStatus, questionCategory);
      fetchQuestions('my-questions', 1);
    }
  }, [questionStatus, questionCategory]);

  useEffect(() => {
    if (tab === 'answered') {
      console.log('[useEffect filter change] answered', answerStatus, answerCategory);
      fetchQuestions('answered', 1);
    }
  }, [answerStatus, answerCategory]);

  const loadMore = () => {
    const nextPage = (pages[tab] ?? 1) + 1;
    fetchQuestions(tab, nextPage);
  };

  // サマリー（モック風カードの値算出）
  const summaryFromQuestions = useMemo(() => {
    const list = data['my-questions'] || [];
    const answers = list.reduce((acc, q) => acc + (q.answerCount || 0), 0);
    const questionsCount = list.length;
    const answered = list.filter((q) => q.status === 'answered').length;
    const newItems = (data.latest || []).length;
    return { answers, questions: questionsCount, answered, newItems };
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ホーム</h1>
              {userName && <p className="text-sm text-gray-600 mt-1">{userName} さん、こんにちは</p>}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="通知"
                title="通知"
                className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700"
              >
                <Icon name="notifications" size={22} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link
                href="/profile"
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 text-gray-700"
                aria-label="マイページ"
                title="マイページ"
              >
                <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold overflow-hidden border border-emerald-200">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt="プロフィール" className="w-full h-full object-cover" />
                  ) : (
                    (userName || 'ユーザー').slice(0, 1)
                  )}
                </span>
              </Link>
              {/* PC: 質問投稿ボタンを同じ行に表示 */}
              <Link
                href="/liff/question/post"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#2DB596] hover:bg-[#1E8F75] text-white rounded-lg transition-colors font-semibold"
              >
                <Icon name="add" size={20} className="text-white" />
                質問を投稿
              </Link>
            </div>
          </div>
          {/* モバイル: 質問投稿ボタンを別行に表示 */}
          <div className="md:hidden mt-3">
            <Link
              href="/liff/question/post"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#2DB596] hover:bg-[#1E8F75] text-white rounded-lg transition-colors font-semibold"
            >
              <Icon name="add" size={20} className="text-white" />
              質問を投稿
            </Link>
          </div>
        </div>
      </div>

      {/* サマリー表示（質問数 → 回答数） */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 質問数カード（内訳: 回答あり / 新着あり） */}
          <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-emerald-50 px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="help" size={18} className="text-emerald-700" />
              <span>質問数</span>
            </div>
            <div className="text-2xl font-bold text-emerald-700">{summaryFromQuestions.questions}</div>
            <div className="text-xs text-gray-600 flex flex-wrap gap-3">
              <span className="flex items-center gap-1">
                <Icon name="check_circle" size={14} className="text-purple-600" />
                回答あり {summaryFromQuestions.answered} 件
              </span>
              <span className="flex items-center gap-1">
                <Icon name="update" size={14} className="text-amber-600" />
                新着あり {summaryFromQuestions.newItems} 件
              </span>
            </div>
          </div>

          {/* 回答数カード */}
          <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-blue-50 px-3 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="chat" size={18} className="text-blue-700" />
              <span>回答数</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{summaryFromQuestions.answers}</div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* 貢献サマリー（タブ外） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">貢献度グラフィック</h3>
            <ContributionGraphic />
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">獲得サンキュー数</h3>
            <ThankCount />
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">貢献カテゴリ</h3>
            <ContributionCategory />
          </div>
        </div>

        {/* タブ切り替え */}
        <div className="bg-white border border-gray-200 rounded-lg px-4">
          <div className="flex gap-0">
            {[
              { id: 'latest', label: '新着', icon: 'update' },
              { id: 'my-questions', label: '質問', icon: 'help' },
              { id: 'answered', label: '回答', icon: 'check_circle' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id as TabType)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors ${
                  tab === item.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* CTA バナー（コンテンツが空のときの補助） */}
        {data[tab]?.length === 0 && !loading && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">質問を投稿しますか？</h3>
            <p className="text-gray-700 mb-4">医療の質問を投稿して、回答をもらいましょう</p>
            <Link
              href="/liff/question/post"
              className="inline-block px-6 py-2 bg-[#2DB596] hover:bg-[#1E8F75] text-white font-semibold rounded-lg transition-colors"
            >
              質問を投稿する
            </Link>
          </div>
        )}

        {/* フィルタパネル（質問タブ / 回答タブ） */}
        {tab !== 'latest' && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-wrap gap-4 items-center">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">ステータス</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={tab === 'my-questions' ? questionStatus : answerStatus}
                onChange={(e) => {
                  if (tab === 'my-questions') {
                    setQuestionStatus(e.target.value);
                  } else {
                    setAnswerStatus(e.target.value);
                  }
                }}
              >
                <option value="all">すべて</option>
                <option value="open">未回答</option>
                <option value="answered">回答済み</option>
                <option value="closed">クローズ</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">カテゴリ</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={tab === 'my-questions' ? questionCategory : answerCategory}
                onChange={(e) => {
                  if (tab === 'my-questions') {
                    setQuestionCategory(e.target.value);
                  } else {
                    setAnswerCategory(e.target.value);
                  }
                }}
              >
                <option value="all">すべて</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* 質問・回答リスト */}
        <div className="space-y-4">
          {data[tab]?.map((question) => (
            <Link
              key={question.id}
              href={`/questions/${question.id}`}
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800 hover:text-[#2DB596]">{question.title}</h3>
                    {question.status && (
                      <span
                        className={`text-xs px-2 py-1 rounded font-semibold ${
                          question.status === 'open'
                            ? 'bg-blue-100 text-blue-700'
                            : question.status === 'answered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {question.status === 'open'
                          ? '回答中'
                          : question.status === 'answered'
                          ? '回答済'
                          : 'クローズ'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{question.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="bg-[#2DB596]/10 text-[#2DB596] px-2 py-1 rounded">{question.category}</span>
                  <span>投稿者: {question.authorName}</span>
                  <span>{question.createdAt}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Icon name="message" size={16} />
                  <span className="font-semibold">{question.answerCount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 読み込み中 */}
        {loading && (
          <div className="py-8 text-center">
            <div className="inline-block animate-spin">
              <Icon name="autorenew" size={32} className="text-blue-600" />
            </div>
            <p className="text-gray-600 mt-2">読み込み中...</p>
          </div>
        )}

        {/* "もっと見る" ボタン（新着は 10 件固定のため非表示） */}
        {tab !== 'latest' && hasMore[tab] && !loading && (data[tab]?.length ?? 0) > 0 && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              もっと見る
            </button>
          </div>
        )}

        {/* 質問なし */}
        {!loading && (data[tab]?.length ?? 0) === 0 && tab !== 'latest' && (
          <div className="text-center py-12">
            <Icon name="inbox" size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">該当する項目がありません</p>
          </div>
        )}
      </div>

      {/* フッター */}
      <footer className="mt-auto bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <p className="mb-2">
          <a href="/terms" className="hover:text-[#2DB596] transition-colors underline">利用規約</a>
          {' '}・{' '}
          <a href="/privacy" className="hover:text-[#2DB596] transition-colors underline">プライバシーポリシー</a>
        </p>
        <p>© 2025 Medily. All rights reserved.</p>
      </footer>
    </div>
  );
}
