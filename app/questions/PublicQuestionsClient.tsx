'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import MasterFilter from '@/components/MasterFilter';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useRouter } from 'next/navigation';
import { Question } from '@/lib/services/questionService';
import { MasterItem } from '@/lib/services/masterService';

interface PublicQuestionsClientProps {
  initialQuestions: Question[];
  initialHasMore: boolean;
  initialPage: number;
  initialCategories: MasterItem[];
  initialRegions: MasterItem[];
}

export default function PublicQuestionsClient({
  initialQuestions,
  initialHasMore,
  initialPage,
  initialCategories,
  initialRegions
}: PublicQuestionsClientProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [loading, setLoading] = useState(false); // Initial load is done by Server
  const [region, setRegion] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    initialCategories.forEach((c) => map[c.id] = c.name);
    return map;
  }, [initialCategories]);

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
      let url = `/api/questions?public=true&limit=10&page=${pageNum}`;
      // Add status filters for "Open" questions
      ['open', 'matching', 'waiting_for_answer', 'matching_failed'].forEach(s => {
        url += `&status=${s}`;
      });

      if (region.length > 0) {
        region.forEach((r) => {
          url += `&region=${encodeURIComponent(r)}`;
        });
      }
      if (category.length > 0) {
        // category param handles array in API
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
              options={initialRegions}
            />
            <MasterFilter
              title="カテゴリで絞り込み"
              masterType="category"
              multiple
              grouped
              value={category}
              onChange={setCategory}
              options={initialCategories}
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
                    {new Date(question.postedAt || question.createdAt).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="person" size={14} />
                    {question.authorName}
                  </span>
                  {question.categories && question.categories.length > 0 && (
                    <Badge variant="success" icon="category" className="text-xs py-0.5 px-2">
                      {categoryMap[question.categories[0]] || question.categories[0]}
                    </Badge>
                  )}
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

