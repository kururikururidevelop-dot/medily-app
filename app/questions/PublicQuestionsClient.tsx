'use client';

import { useState, useEffect, useMemo, useTransition, useCallback } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import MasterFilter from '@/components/MasterFilter';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Question } from '@/lib/services/questionService';
import { MasterItem } from '@/lib/services/masterService';

interface PublicQuestionsClientProps {
  initialQuestions: Question[];
  initialHasMore: boolean;
  initialPage: number;
  initialCategories: MasterItem[];
  initialRegions: MasterItem[];
  currentUserId?: string;
}

export default function PublicQuestionsClient({
  initialQuestions,
  initialHasMore,
  initialPage,
  initialCategories,
  initialRegions,
  currentUserId
}: PublicQuestionsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // URL Params State
  const initialKeyword = searchParams.get('keyword') || '';
  const initialRegionParams = searchParams.getAll('region');
  const initialCategoryParams = searchParams.getAll('category');

  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [loading, setLoading] = useState(false);

  // Filters
  const [keyword, setKeyword] = useState(initialKeyword); // Input state
  const [region, setRegion] = useState<string[]>(initialRegionParams);
  const [category, setCategory] = useState<string[]>(initialCategoryParams);

  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    initialCategories.forEach((c) => map[c.id] = c.name);
    return map;
  }, [initialCategories]);

  // Sync state from props (when URL changes and Server Component re-renders)
  useEffect(() => {
    setQuestions(initialQuestions);
    setHasMore(initialHasMore);
    setPage(initialPage);
    // Determine applied filters from props/server logic if needed, 
    // but here we trust URL params -> Server Fetch -> Props flow.
  }, [initialQuestions, initialHasMore, initialPage]);

  // Update URL Helper
  const updateUrl = useCallback((newParams: Record<string, string | number | string[] | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      // Always delete first to overwrite or remove
      params.delete(key);

      if (value === undefined || value === '') {
        // Already deleted
      } else if (Array.isArray(value)) {
        value.forEach(v => params.append(key, String(v)));
      } else {
        params.set(key, String(value));
      }
    });

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [pathname, router, searchParams]);

  // Filter Change Handlers
  const handleKeywordCommit = () => {
    updateUrl({ keyword: keyword || undefined, page: 1 });
  };

  const handleRegionChange = (val: string[]) => {
    setRegion(val);
    updateUrl({ region: val.length ? val : undefined, page: 1 });
  };

  const handleCategoryChange = (val: string[]) => {
    setCategory(val);
    updateUrl({ category: val.length ? val : undefined, page: 1 });
  };

  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);
    const nextPage = page + 1;

    // Client-side fetch for Load More (Append)
    // We must manually construct URL from current state because updateUrl only handles navigation/replace
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(nextPage));
      params.set('limit', '10');
      params.set('public', 'true');
      if (currentUserId) params.set('excludeUserId', currentUserId);

      // Status defaults
      ['matching', 'waiting_for_answer', 'matching_failed'].forEach(s => params.append('status', s));

      const res = await fetch(`/api/questions?${params.toString()}`);
      if (!res.ok) throw new Error('Load more failed');
      const data = await res.json();

      setQuestions(prev => [...prev, ...data.questions]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center relative">
          <h1 className="text-xl font-bold text-gray-800">みんなの質問</h1>
        </div>
      </div>

      {/* フィルタ */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="p-4 space-y-4">
          {/* Keyword Filter */}
          <div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleKeywordCommit()}
                  placeholder="質問のタイトルや内容で検索..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Button onClick={handleKeywordCommit} size="sm" className="px-6">
                検索
              </Button>
            </div>
          </div>

          {/* Filters */}
          <MasterFilter
            title="地域で絞り込み"
            masterType="region"
            multiple
            grouped
            value={region}
            onChange={handleRegionChange}
            options={initialRegions}
          />
          <MasterFilter
            title="カテゴリで絞り込み"
            masterType="category"
            multiple
            grouped
            value={category}
            onChange={handleCategoryChange}
            options={initialCategories}
          />
        </Card>
      </div>

      {/* 質問件数 */}
      <div className="max-w-4xl mx-auto px-4 pb-2">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-800">検索結果</span>
          {!isPending && (
            <span className="ml-2">
              <strong className="text-gray-900">{questions.length}</strong> 件
            </span>
          )}
        </p>
      </div>

      {/* 質問一覧 */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {(loading || isPending) && questions.length === 0 ? (
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
                <Link href={`/questions/${question.id}`} className="block">
                  {/* 質問タイトル */}
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-snug">{question.title}</h3>
                    {/* Region moved to top */}
                    <div className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 whitespace-nowrap">
                      <Icon name="location_on" size={12} className="mr-0.5" />
                      {question.region}
                    </div>
                  </div>

                  {/* 質問本文（抜粋） */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{question.description}</p>

                  {/* メタデータ行 */}
                  <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500">
                    {/* Date with time */}
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

                    {/* Categories */}
                    {question.categories && question.categories.length > 0 && question.categories.map((catId, idx) => (
                      <span key={idx} className="inline-flex items-center px-2.5 py-0.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-semibold text-gray-800">
                        {categoryMap[catId] || catId}
                      </span>
                    ))}
                  </div>
                </Link>

                {/* 回答ボタン */}
                <div className="flex justify-end mt-3 border-t border-gray-100 pt-3">
                  <Button
                    href="/auth/login"
                    icon="edit_square"
                    size="sm"
                    className="px-6 py-2"
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
            <p className="text-gray-500">© 2025 kururikururi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

