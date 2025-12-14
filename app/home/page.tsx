'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
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
  const router = useRouter();
  useRequireAuth();
  const [tab, setTab] = useState<TabType>('latest');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  // ユーザー名を取得
  useEffect(() => {
    const displayName = localStorage.getItem('displayName');
    const userId = localStorage.getItem('userId');

    if (displayName) {
      setUserName(displayName);
      return;
    }

    // displayName が無い場合はプロフィール API から取得
    if (!userId) return;
    setUserId(userId);

    let aborted = false;
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/users/profile?userId=${userId}`);
        if (!res.ok) return;
        const data = await res.json();
        const name = data?.user?.displayName;
        if (name && !aborted) {
          setUserName(name);
          localStorage.setItem('displayName', name);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    fetchProfile();
    return () => {
      aborted = true;
    };
  }, []);

  // 質問データ取得
  const fetchQuestions = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      let url = `/api/questions?limit=10`;
      if (tab === 'latest') {
        url += `&public=true&status=open`;
      } else if (tab === 'my-questions') {
        if (userId) {
          url += `&userId=${encodeURIComponent(userId)}`;
        } else {
          url += `&public=true`;
        }
      } else if (tab === 'answered') {
        url += `&public=true&status=answered`;
      }

      const response = await fetch(url);

      if (!response.ok) throw new Error('質問の取得に失敗しました');

      const data = await response.json();

      if (pageNum === 1) {
        setQuestions(data.questions);
      } else {
        setQuestions((prev) => [...prev, ...data.questions]);
      }

      setHasMore(data.hasMore);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
    } finally {
      setLoading(false);
    }
  }, [tab, userId]);

  useEffect(() => {
    setPage(1);
    fetchQuestions(1);
  }, [tab, fetchQuestions]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchQuestions(nextPage);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ホーム</h1>
            {userName && <p className="text-sm text-gray-600 mt-1">{userName} さん、こんにちは</p>}
          </div>
          <div className="flex items-center gap-3">
            {/* 通知アイコン（モック） */}
            <button
              type="button"
              aria-label="通知"
              title="通知"
              className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700"
            >
              <Icon name="notifications" size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {/* 設定メニューアイコン（モック） */}
            <Link
              href="/settings"
              aria-label="設定"
              title="設定"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
            >
              <Icon name="settings" size={22} />
            </Link>
            {/* 質問投稿ボタン */}
            <Link
              href="/liff/question/post"
              className="flex items-center gap-2 px-4 py-2 bg-[#2DB596] hover:bg-[#1E8F75] text-white rounded-lg transition-colors font-semibold"
            >
              <Icon name="add" size={20} className="text-white" />
              質問を投稿
            </Link>
          </div>
        </div>

        {/* 導線ナビゲーション */}
        <div className="border-t border-gray-200 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto flex gap-4 py-3 text-sm">
            <Link
              href="/questions"
              className="text-[#2DB596] hover:text-[#1E8F75] font-semibold flex items-center gap-1"
            >
              <Icon name="help" size={16} />
              自分の質問へ
            </Link>
            <Link
              href="/answers"
              className="text-[#2DB596] hover:text-[#1E8F75] font-semibold flex items-center gap-1"
            >
              <Icon name="check_circle" size={16} />
              自分の回答へ
            </Link>
          </div>
        </div>

        {/* タブ */}
        <div className="border-t border-gray-200 px-4">
          <div className="max-w-4xl mx-auto flex gap-0">
            {[
              { id: 'latest', label: '新着質問', icon: 'update' },
              { id: 'my-questions', label: '自分の質問', icon: 'help' },
              { id: 'answered', label: '回答済み', icon: 'check_circle' },
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
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* CTA バナー */}
        {questions.length === 0 && !loading && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              質問を投稿しますか？
            </h3>
            <p className="text-gray-700 mb-4">
              医療の質問を投稿して、回答をもらいましょう
            </p>
            <Link
              href="/liff/question/post"
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              質問を投稿する
            </Link>
          </div>
        )}

        {/* 質問リスト */}
        <div className="space-y-4">
          {questions.map((question) => (
            <Link
              key={question.id}
              href={`/questions/${question.id}`}
              className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-800 hover:text-[#2DB596]">
                      {question.title}
                    </h3>
                    {question.status && (
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${
                        question.status === 'open'
                          ? 'bg-blue-100 text-blue-700'
                          : question.status === 'answered'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {question.status === 'open' ? '回答中' : question.status === 'answered' ? '回答済' : 'クローズ'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {question.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="bg-[#2DB596]/10 text-[#2DB596] px-2 py-1 rounded">
                    {question.category}
                  </span>
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
              <Icon name="loading" size={32} className="text-blue-600" />
            </div>
            <p className="text-gray-600 mt-2">読み込み中...</p>
          </div>
        )}

        {/* "もっと見る" ボタン */}
        {hasMore && !loading && questions.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              もっと見る
            </button>
          </div>
        )}

        {/* 質問なし */}
        {!loading && questions.length === 0 && tab !== 'latest' && (
          <div className="text-center py-12">
            <Icon name="inbox" size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">質問はまだありません</p>
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
