'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import MasterFilter from '@/components/MasterFilter';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useRouter } from 'next/navigation';
import { Question } from '@/lib/services/questionService';

// Ensure Question interface matches the service one or extend/adapt if needed
// The service Question interface has all fields needed.
// But the component uses `Question` interface locally defined. 
// I should import `Question` from service if possible, or adapt.
// Service `Question` has `answerCount`, `createdAt` as string.
// Local interface: 
// interface Question { ... answerCount: number; createdAt: string; ... } => Matches.

interface PublicQuestionsClientProps {
  initialQuestions: Question[];
  initialHasMore: boolean;
  initialPage: number;
}

export default function PublicQuestionsClient({ initialQuestions, initialHasMore, initialPage }: PublicQuestionsClientProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [loading, setLoading] = useState(false); // Initial load is done by Server
  const [region, setRegion] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);

  // When filters change, we need to fetch again (Client Side)
  // But initial render should NOT fetch if filters are empty.
  // HOWEVER, initial render has empty filters.
  // We need to skip the first effect trigger if it matches initial state?
  // Or just rely on the fact that initial data IS expected result for empty filters.
  // Currently `useEffect` calls `fetchQuestions(1)` on mount because `region` and `category` are [].
  // If we want to use initial data, we should skip this first fetch.

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    fetchQuestions(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, category]);

  const fetchQuestions = async (pageNum: number) => {
    setLoading(true);
    try {
      let url = `/api/questions?public=true&status=open&limit=10&page=${pageNum}`;
      if (region.length > 0) {
        region.forEach((r) => {
          url += `&region=${encodeURIComponent(r)}`;
        });
      }
      if (category.length > 0) {
        category.forEach((cat) => {
          url += `&category=${encodeURIComponent(cat)}`;
        });
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('質問の取得に失敗しました');

      const data = await response.json();
      if (pageNum === 1) {
        setQuestions(data.questions || []);
      } else {
        setQuestions((prev) => [...prev, ...(data.questions || [])]);
      }
      setHasMore(data.hasMore || false);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchQuestions(page + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <Icon name="arrow_back" size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">質問一覧</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* 説明 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-primary-ultralight border border-primary/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="info" size={24} className="text-primary-dark flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-1">未回答の質問が一覧で表示されています</h2>
              <p className="text-sm text-gray-700">
                回答するにはLINEでログインが必要です。あなたの経験が誰かの役に立ちます。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルタ */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MasterFilter
              title="地域で絞り込み"
              masterType="region"
              multiple
              grouped
              value={region}
              onChange={setRegion}
            />
            <MasterFilter
              title="カテゴリで絞り込み"
              masterType="category"
              multiple
              grouped
              value={category}
              onChange={setCategory}
            />
          </div>
        </Card>
      </div>

      {/* 質問件数 */}
      <div className="max-w-4xl mx-auto px-4 pb-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">未回答の質問</span>
          {!loading && (
            <span className="ml-2">
              <strong className="text-gray-900">{questions.length}</strong> 件
            </span>
          )}
        </p>
      </div>

      {/* 質問一覧 */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {loading && questions.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="inline-block animate-spin">
              <Icon name="autorenew" size={40} className="text-primary" />
            </div>
            <p className="text-gray-600 ml-3">読み込み中...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="search_off" size={48} className="text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">該当する質問が見つかりませんでした</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <Card
                key={question.id}
                className="p-5 hover:border-primary"
                hoverable
              >
                {/* 質問タイトル */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{question.title}</h3>

                {/* 質問本文（抜粋） */}
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{question.description}</p>

                {/* メタデータ行 */}
                <div className="flex items-center flex-wrap gap-y-2 gap-x-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Icon name="schedule" size={14} />
                    {new Date(question.createdAt).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      // Formatting here re-formats the string or already formatted string?
                      // The service returns localized string. `new Date(string)` might fail or vary.
                      // If service returns "2023/01/01 12:00:00", new Date() works in standard browsers.
                      // But better to trust the string if it's already formatted?
                      // The existing code was: new Date(question.createdAt).toLocaleString.
                      // The service returns string formatted by `toLocaleString('ja-JP')`.
                      // So `new Date("2023/1/1 12:00:00")` works.
                      // I will leave it as is if it works, or just display string if already formatted.
                      // The service `formatDate` output `toLocaleString('ja-JP')`.
                      // This might produce "2023/1/1 12:00:00".
                      // `new Date` on it works.
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="person" size={14} />
                    {question.authorName}
                  </span>
                  <Badge variant="success" icon="category" className="text-xs py-0.5 px-2">
                    {question.category}
                  </Badge>
                  <Badge variant="default" icon="location_on" className="text-xs py-0.5 px-2">
                    {question.region}
                  </Badge>
                </div>

                {/* 回答ボタン */}
                <div className="flex justify-end pt-3 border-t border-gray-200">
                  <Button
                    href="/auth/login"
                    icon="edit_square"
                    size="sm"
                    className="px-6 py-2.5"
                  >
                    回答する
                  </Button>
                </div>
              </Card>
            ))}

            {/* もっと見るボタン */}
            {hasMore && !loading && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  className="px-8 py-3 hover:border-primary hover:text-primary-dark"
                >
                  もっと見る
                </Button>
              </div>
            )}

            {loading && page > 1 && (
              <div className="flex justify-center py-4">
                <div className="inline-block animate-spin">
                  <Icon name="autorenew" size={32} className="text-primary" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-primary transition-colors">
                利用規約
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                プライバシーポリシー
              </Link>
            </div>
            <p className="text-gray-500">© 2025 Medily. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

