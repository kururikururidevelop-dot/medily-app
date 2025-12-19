'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ContributionGraphic from '@/components/ContributionGraphic';
import ThankCount from '@/components/ThankCount';
import ContributionCategory from '@/components/ContributionCategory';
import MasterFilter from '@/components/MasterFilter';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface Question {
  id: string;
  title: string;
  description: string;
  category: string;
  authorName?: string;
  createdAt: string;
  answerCount: number;
  status?: string;
  parentQuestionId?: string | null;
}

interface HomeClientProps {
  initialData: {
    latest: Question[];
    myQuestions: Question[];
    answered: Question[];
  };
  summary: {
    questions: number;
    answeredQuestions: number;
    answers: number;
  };
  userName: string;
  userId: string;
  avatarUrl?: string;
}

type TabType = 'latest' | 'my-questions' | 'answered';

import { useRequireAuth } from '@/app/hooks/useRequireAuth';

export default function HomeClient({ initialData, summary, userName, userId, avatarUrl }: HomeClientProps) {
  useRequireAuth();
  const [tab, setTab] = useState<TabType>('latest');
  const [data, setData] = useState<Record<TabType, Question[]>>({
    latest: initialData.latest,
    'my-questions': initialData.myQuestions,
    answered: initialData.answered,
  });
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<Record<TabType, number>>({ latest: 1, 'my-questions': 1, answered: 1 });
  const [hasMore, setHasMore] = useState<Record<TabType, boolean>>({ latest: true, 'my-questions': true, answered: true });
  const [questionStatus, setQuestionStatus] = useState<string[]>([]);
  const [questionCategories, setQuestionCategories] = useState<string[]>([]);
  const [answerStatus, setAnswerStatus] = useState<string[]>([]);
  const [answerCategories, setAnswerCategories] = useState<string[]>([]);
  const [expandedChains, setExpandedChains] = useState<Set<string>>(new Set());

  // 質問データ取得（ページネーションとフィルタ用）
  const fetchQuestions = useCallback(
    async (targetTab: TabType, pageNum: number) => {
      setLoading(true);
      try {
        let url = `/api/questions?limit=10&page=${pageNum}`;
        if (targetTab === 'latest') {
          url += `&userId=${encodeURIComponent(userId)}`;
        } else if (targetTab === 'my-questions') {
          url += `&userId=${encodeURIComponent(userId)}`;
          const status = questionStatus[0];
          if (status && status !== 'all') url += `&status=${encodeURIComponent(status)}`;
          if (questionCategories.length > 0) {
            questionCategories.forEach((cat) => {
              url += `&category=${encodeURIComponent(cat)}`;
            });
          }
        } else if (targetTab === 'answered') {
          url += `&answeredBy=${encodeURIComponent(userId)}`;
          const status = answerStatus[0];
          if (status && status !== 'all') url += `&status=${encodeURIComponent(status)}`;
          if (answerCategories.length > 0) {
            answerCategories.forEach((cat) => {
              url += `&category=${encodeURIComponent(cat)}`;
            });
          }
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
    [answerCategories, answerStatus, questionCategories, questionStatus, userId],
  );

  // フィルタ変更時の再取得
  useEffect(() => {
    if (tab === 'my-questions') {
      console.log('[useEffect filter change] my-questions', questionStatus, questionCategories);
      fetchQuestions('my-questions', 1);
    }
  }, [questionStatus, questionCategories, fetchQuestions, tab]);

  useEffect(() => {
    if (tab === 'answered') {
      console.log('[useEffect filter change] answered', answerStatus, answerCategories);
      fetchQuestions('answered', 1);
    }
  }, [answerStatus, answerCategories, fetchQuestions, tab]);

  const loadMore = () => {
    const nextPage = (pages[tab] ?? 1) + 1;
    fetchQuestions(tab, nextPage);
  };

  // 追加質問チェーンを構築
  const chains = useMemo(() => {
    const list = data[tab] || [];
    const map = new Map<string, Question>();
    list.forEach((q) => map.set(q.id, q));

    const findRootId = (questionId: string): string => {
      const visited = new Set<string>();
      let current = questionId;
      while (true) {
        if (visited.has(current)) return current;
        visited.add(current);
        const q = map.get(current);
        if (!q || !q.parentQuestionId) return current;
        current = q.parentQuestionId;
      }
    };

    const rootMap = new Map<string, Question[]>();
    list.forEach((q) => {
      const rootId = findRootId(q.id);
      if (!rootMap.has(rootId)) rootMap.set(rootId, []);
      rootMap.get(rootId)!.push(q);
    });

    const result: { root: Question; children: Question[] }[] = [];
    rootMap.forEach((questions, rootId) => {
      const root = map.get(rootId);
      if (!root) return;
      const children = questions.filter((q) => q.id !== rootId);
      children.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      result.push({ root, children });
    });

    result.sort((a, b) => new Date(b.root.createdAt).getTime() - new Date(a.root.createdAt).getTime());
    return result;
  }, [data, tab]);

  const toggleChain = (rootId: string) => {
    setExpandedChains((prev) => {
      const next = new Set(prev);
      if (next.has(rootId)) {
        next.delete(rootId);
      } else {
        next.add(rootId);
      }
      return next;
    });
  };

  const renderQuestionCard = (q: Question, isChild = false, hasChildren = false, childCount = 0, onToggle?: () => void, isExpanded = false) => {
    let badgeVariant: 'success' | 'neutral' | 'warning' = 'warning';
    let statusText = '回答募集中';
    let statusIcon = 'schedule';

    if (q.status === 'answered') {
      badgeVariant = 'success';
      statusText = '回答済み';
      statusIcon = 'check_circle';
    } else if (q.status === 'closed') {
      badgeVariant = 'neutral';
      statusText = 'クローズ';
      statusIcon = 'block';
    }

    return (
      <Card
        key={q.id}
        className={`p-4 ${isChild ? 'border-l-4 border-l-blue-400 ml-6' : ''}`}
        hoverable
      >
        <Link href={`/questions/${q.id}`} className="block space-y-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-800 text-base flex-1">{q.title}</h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{q.description}</p>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Icon name="schedule" size={14} />
              {new Date(q.createdAt).toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <Badge variant="success" icon="category" className="text-xs py-0.5 px-2">
              {q.category}
            </Badge>
            <span className="flex items-center gap-1">
              <Icon name="chat" size={14} />
              {q.answerCount} 件の回答
            </span>
          </div>
        </Link>
        {
          hasChildren && onToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onToggle();
              }}
              className="mt-3 text-blue-600 hover:text-blue-800 p-0 h-auto font-medium hover:bg-transparent"
            >
              <Icon name={isExpanded ? 'expand_less' : 'expand_more'} size={16} />
              {isExpanded ? '追加の質問を隠す' : '追加の質問を表示'}（{childCount}件）
            </Button>
          )
        }
      </Card >
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="home" size={28} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-800">ホーム</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700"
                aria-label="通知"
                title="通知"
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
              <Button
                href="/questions/post"
                className="hidden md:flex"
                icon="add"
              >
                質問を投稿
              </Button>
            </div>
          </div>
          <div className="md:hidden mt-3">
            <Button
              href="/questions/post"
              className="w-full"
              icon="add"
            >
              質問を投稿
            </Button>
          </div>
        </div>
      </div>

      {/* サマリー表示 */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="flex flex-col gap-2 border-gray-100 bg-emerald-50 px-3 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="help" size={18} className="text-emerald-700" />
              <span>質問数</span>
            </div>
            <div className="text-2xl font-bold text-emerald-700">{summary.questions}</div>
            <div className="text-xs text-gray-600 flex flex-wrap gap-3">
              <span className="flex items-center gap-1">
                <Icon name="check_circle" size={14} className="text-purple-600" />
                回答あり {summary.answeredQuestions} 件
              </span>
              <span className="flex items-center gap-1">
                <Icon name="update" size={14} className="text-amber-600" />
                新着あり {(data.latest || []).length} 件
              </span>
            </div>
          </Card>

          <Card className="flex flex-col gap-2 border-gray-100 bg-blue-50 px-3 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Icon name="chat" size={18} className="text-blue-700" />
              <span>回答数</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{summary.answers}</div>
          </Card>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* 貢献サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">貢献度グラフィック</h3>
            <ContributionGraphic />
          </Card>
          <Card className="p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">獲得サンキュー数</h3>
            <ThankCount />
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">貢献カテゴリ</h3>
            <ContributionCategory />
          </Card>
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
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-colors ${tab === item.id
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

        {/* フィルタ */}
        {tab === 'my-questions' && (
          <Card className="p-4 space-y-4">
            <MasterFilter
              title="ステータスで絞り込み"
              masterType="status"
              multiple={false}
              grouped={false}
              value={questionStatus}
              onChange={setQuestionStatus}
            />
            <MasterFilter
              title="カテゴリで絞り込み"
              masterType="category"
              multiple
              grouped
              value={questionCategories}
              onChange={setQuestionCategories}
            />
          </Card>
        )}

        {tab === 'answered' && (
          <Card className="p-4 space-y-4">
            <MasterFilter
              title="ステータスで絞り込み"
              masterType="status"
              multiple={false}
              grouped={false}
              value={answerStatus}
              onChange={setAnswerStatus}
            />
            <MasterFilter
              title="カテゴリで絞り込み"
              masterType="category"
              multiple
              grouped
              value={answerCategories}
              onChange={setAnswerCategories}
            />
          </Card>
        )}

        {/* 質問一覧 */}
        <div className="space-y-4">
          {chains.length === 0 && !loading && (
            <Card className="p-8 text-center text-gray-500">
              <Icon name="inbox" size={48} className="mx-auto mb-2 text-gray-400" />
              <p>まだ質問がありません</p>
            </Card>
          )}

          {chains.map(({ root, children }) => {
            const isExpanded = expandedChains.has(root.id);
            return (
              <div key={root.id} className="space-y-2">
                {renderQuestionCard(
                  root,
                  false,
                  children.length > 0,
                  children.length,
                  () => toggleChain(root.id),
                  isExpanded
                )}
                {isExpanded && children.map((child) => renderQuestionCard(child, true))}
              </div>
            );
          })}

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && hasMore[tab] && chains.length > 0 && (
            <div className="text-center pt-4">
              <Button
                variant="secondary"
                onClick={loadMore}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                もっと見る
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
