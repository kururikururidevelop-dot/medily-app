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
  const [imgError, setImgError] = useState(false);

  // Debug State for Contribution Graphic
  const [debugAnswerCount, setDebugAnswerCount] = useState(0);
  const [debugThankerCount, setDebugThankerCount] = useState(3);

  useEffect(() => {
    if (summary.answers) setDebugAnswerCount(summary.answers);
  }, [summary.answers]);

  // 質問データ取得（ページネーションとフィルタ用）
  const fetchQuestions = useCallback(
    async (targetTab: TabType, pageNum: number) => {
      setLoading(true);
      try {
        let url = `/api/questions?limit=10&page=${pageNum}`;
        if (targetTab === 'latest') {
          // User Requirement: Home "Latest" tab must only show OWN questions.
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
      {/* ヘッダー */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold overflow-hidden border border-emerald-200">
                {avatarUrl && !imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt="プロフィール"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <Icon name="account_circle" size={32} className="text-emerald-700/50" />
                )}
              </span>
              <h1 className="text-xl font-bold text-gray-800">{userName || 'ユーザー'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700"
                aria-label="通知"
                title="通知"
              >
                <Icon name="notifications" size={24} />
                <span className="absolute 0 0 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              {/* Profile Link Removed as requested */}
              <Button
                href="/questions/post"
                className="hidden md:flex text-lg px-8 py-3"
                size="lg"
                icon="add"
              >
                質問を投稿
              </Button>
            </div>
          </div>
          <div className="md:hidden mt-3">
            <Button
              href="/questions/post"
              className="w-full py-4 text-lg"
              icon="add"
            >
              質問を投稿
            </Button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* 貢献サマリー (Simplified) */}
        {/* 貢献サマリー (Simplified) */}
        <div className="flex flex-col items-center gap-4">
          <Card className="p-6 w-full max-w-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">貢献度＆サンキュー</h3>
            <ContributionGraphic answerCount={debugAnswerCount} thankerCount={debugThankerCount} />
          </Card>

          {/* Debug Controls (Temporary) */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-wrap gap-6 items-center shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">回答数 (Level)</span>
              <button
                onClick={() => setDebugAnswerCount(Math.max(0, debugAnswerCount - 1))}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >-</button>
              <span className="w-8 text-center font-bold">{debugAnswerCount}</span>
              <button
                onClick={() => setDebugAnswerCount(debugAnswerCount + 1)}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >+</button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">質問者数 (Bubbles)</span>
              <button
                onClick={() => setDebugThankerCount(Math.max(0, debugThankerCount - 1))}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >-</button>
              <span className="w-8 text-center font-bold">{debugThankerCount}</span>
              <button
                onClick={() => setDebugThankerCount(debugThankerCount + 1)}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >+</button>
            </div>
          </div>
        </div>

        {/* サマリー表示 (Moved Here) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="flex flex-col gap-2 border-emerald-100 bg-white px-6 py-5 shadow-sm h-full">
            {/* Line 1: Icon, Title, Count */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Icon name="help" size={20} />
              </div>
              <span className="text-base font-bold text-gray-700">自分の質問</span>
              <div className="ml-auto flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">{summary.questions}</span>
                <span className="text-sm font-medium text-blue-600">件</span>
              </div>
            </div>
            {/* Line 2: Details */}
            <div className="text-xs text-gray-400 flex flex-wrap gap-3 pl-11">
              <span>回答あり {summary.answeredQuestions} 件</span>
              <span>新着あり {(data.latest || []).length} 件</span>
            </div>
          </Card>

          <Card className="flex flex-col gap-2 border-blue-100 bg-white px-6 py-5 shadow-sm h-full">
            {/* Line 1: Icon, Title, Count */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Icon name="chat" size={20} />
              </div>
              <span className="text-base font-bold text-gray-700">自分の回答</span>
              <div className="ml-auto flex items-baseline gap-1">
                <span className="text-xl font-bold text-gray-900">{summary.answers}</span>
                <span className="text-sm font-medium text-purple-600">件</span>
              </div>
            </div>
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
