'use client';

import { useState, useEffect, useCallback, useMemo, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import MasterFilter from '@/components/MasterFilter';
import ContributionGraphic from '@/components/ContributionGraphic';
import RankUpOverlay from '@/components/RankUpOverlay';
import { MasterItem } from '@/lib/services/masterService';
import { UserProfile } from '@/lib/services/userService';

// Helper interface for rendering
interface Question {
  id: string;
  title: string;
  description: string;
  category?: string;
  categories?: string[];
  postedAt?: string;
  isPublic?: boolean;
  authorName?: string;
  createdAt: string;
  answerCount: number;
  status?: string;
  parentQuestionId?: string | null;
}
// ... (imports)

// ...

interface FilterState {
  keyword: string;
  status: string[];
  categories: string[];
}

interface HomeClientProps {
  initialData: {
    myQuestions: Question[];
    answered: Question[];
    favorites: Question[];
  };
  initialMeta: {
    'my-questions': { page: number; hasMore: boolean };
    'answered': { page: number; hasMore: boolean };
    'favorites': { page: number; hasMore: boolean };
  };
  initialTab: TabType;
  summary: {
    questions: number;
    answeredQuestions: number;
    answers: number;
  };
  userName: string;
  userId: string;
  avatarUrl?: string;
  userRank?: number;
  initialCategories: MasterItem[];
  initialStatuses: MasterItem[];
  thankers?: UserProfile[];
  initialFavorites: string[];
  initialFilters: Record<TabType, FilterState>;
}

type TabType = 'my-questions' | 'answered' | 'favorites';

import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import { calculateRank } from '@/lib/rankUtils';
import { updateUserRank } from '@/app/actions/user';

export default function HomeClient({
  initialData,
  initialMeta,
  initialTab,
  summary,
  userName,
  userId,
  avatarUrl,
  userRank = 0,
  initialCategories,
  initialStatuses,
  thankers = [],
  initialFavorites,
  initialFilters
}: HomeClientProps) {
  useRequireAuth();

  // Memoized maps from props
  const masterStatuses = useMemo(() => {
    const map: Record<string, string> = {};
    initialStatuses.forEach(s => map[s.id] = s.name);
    return map;
  }, [initialStatuses]);

  const masterCategories = useMemo(() => {
    const map: Record<string, string> = {};
    initialCategories.forEach(c => map[c.id] = c.name);
    return map;
  }, [initialCategories]);

  // Debug State for Contribution Graphic
  const [debugAnswerCount, setDebugAnswerCount] = useState(0);
  const [debugThankerCount, setDebugThankerCount] = useState(3);
  const [showRankUp, setShowRankUp] = useState(false);
  const [prevRank, setPrevRank] = useState(0);
  const [newRank, setNewRank] = useState(0);
  const [internalUserRank, setInternalUserRank] = useState(userRank);

  /* URL-driven State Management */
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Props are the single source of truth driven by Server Component (URL)
  const [data, setData] = useState<Record<TabType, Question[]>>({
    'my-questions': initialData.myQuestions,
    answered: initialData.answered,
    'favorites': initialData.favorites,
  });

  // Sync data when props change
  useEffect(() => {
    setData({
      'my-questions': initialData.myQuestions,
      answered: initialData.answered,
      'favorites': initialData.favorites,
    });
  }, [initialData]);

  const [tab, setTab] = useState<TabType>(initialTab);

  // Unified Filter State
  const [filters, setFilters] = useState<Record<TabType, FilterState>>(initialFilters);

  // Sync filters from URL/Props
  useEffect(() => {
    setTab(initialTab);
    setFilters(initialFilters);
  }, [initialTab, initialFilters]);

  // Favorites State
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(initialFavorites));

  useEffect(() => {
    setFavoriteIds(new Set(initialFavorites));
  }, [initialFavorites]);

  const [expandedChains, setExpandedChains] = useState<Set<string>>(new Set());
  const [imgError, setImgError] = useState(false);

  // Sync Meta
  const [hasMore, setHasMore] = useState(initialMeta);
  useEffect(() => {
    setHasMore(initialMeta);
  }, [initialMeta]);

  // Loading state for transitions
  const [isPending, startTransition] = useTransition();

  // Helper to update URL without adding to history stack (replace)
  const updateUrl = useCallback((newParams: Record<string, string | number | string[] | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key);
        // Special handling for arrays if needed, likely using repeated keys or comma usage
        // But URLSearchParams support varies. Simplest is strictly repeating appending?
        // Medily convention: ?mq_status=open&mq_status=closed
        value.forEach(v => params.append(key, String(v)));
      } else {
        params.set(key, String(value));
      }
    });

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [pathname, router, searchParams]);

  const handleTabChange = (t: TabType) => {
    if (tab !== t) {
      // Optimistic update
      setTab(t);
      // For Tabs, use push to create a history entry so "Back" works as expected
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', t);
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }
  };

  // Keyword Handler
  const handleKeywordCommit = () => {
    const kw = filters[tab].keyword;
    const kwKey = tab === 'my-questions' ? 'mq_kw' : tab === 'answered' ? 'ans_kw' : 'fav_kw';
    const pageKey = tab === 'my-questions' ? 'mq_page' : tab === 'answered' ? 'ans_page' : 'fav_page';
    updateUrl({ [kwKey]: kw || undefined, [pageKey]: 1 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleKeywordCommit();
    }
  };

  // Favorites Toggle
  const handleToggleFavorite = async (e: React.MouseEvent, qId: string) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();

    const isFav = favoriteIds.has(qId);
    const next = new Set(favoriteIds);
    if (isFav) next.delete(qId);
    else next.add(qId);
    setFavoriteIds(next);

    try {
      await fetch('/api/favorites', {
        method: 'POST',
        body: JSON.stringify({ questionId: qId })
      });

      // If in Favorites tab and removing, remove from current view
      if (tab === 'favorites' && isFav) {
        setData(prev => ({
          ...prev,
          'favorites': prev.favorites.filter(q => q.id !== qId)
        }));
      }
    } catch (e) {
      setFavoriteIds(favoriteIds); // Revert
      alert('お気に入りの更新に失敗しました');
    }
  };

  const loadMore = () => {
    const key = tab === 'my-questions' ? 'mq_page' : tab === 'answered' ? 'ans_page' : 'fav_page';
    const current = initialMeta[tab].page;
    updateUrl({ [key]: current + 1 });
  };

  /* Filter Handlers - Sync with URL */
  const updateFilterState = (t: TabType, key: keyof FilterState, val: any) => {
    setFilters(prev => ({
      ...prev,
      [t]: { ...prev[t], [key]: val }
    }));
  };

  const handleQuestionStatusChange = (val: string[]) => {
    updateFilterState('my-questions', 'status', val);
    updateUrl({ mq_status: val.length ? val : undefined, mq_page: 1 });
  };
  const handleQuestionCategoryChange = (val: string[]) => {
    updateFilterState('my-questions', 'categories', val);
    updateUrl({ mq_cats: val.length ? val : undefined, mq_page: 1 });
  };
  const handleAnswerStatusChange = (val: string[]) => {
    updateFilterState('answered', 'status', val);
    updateUrl({ ans_status: val.length ? val : undefined, ans_page: 1 });
  };
  const handleAnswerCategoryChange = (val: string[]) => {
    updateFilterState('answered', 'categories', val);
    updateUrl({ ans_cats: val.length ? val : undefined, ans_page: 1 });
  };
  // New Favorites Filters
  const handleFavoriteStatusChange = (val: string[]) => {
    updateFilterState('favorites', 'status', val);
    updateUrl({ fav_status: val.length ? val : undefined, fav_page: 1 });
  };
  const handleFavoriteCategoryChange = (val: string[]) => {
    updateFilterState('favorites', 'categories', val);
    updateUrl({ fav_cats: val.length ? val : undefined, fav_page: 1 });
  };

  // Mock Thankers Logic for Dev
  const displayThankers = useMemo(() => {
    if (thankers.length > 0) return thankers;
    // Generate mocks if no real thankers and we are testing
    return Array.from({ length: debugThankerCount }, (_, i) => ({
      id: `mock-${i}`,
      displayName: `User ${i + 1}`,
      region: 'Tokyo',
      categories: [],
    } as UserProfile));
  }, [thankers, debugThankerCount]);

  // Update debug count from real data initially
  useEffect(() => {
    if (thankers.length > 0) setDebugThankerCount(thankers.length);
  }, [thankers.length]);

  // Sync prop to state
  useEffect(() => {
    if (userRank) setInternalUserRank(userRank);
  }, [userRank]);

  useEffect(() => {
    if (summary.answers) setDebugAnswerCount(summary.answers);
  }, [summary.answers]);

  // Rank Up Check Logic
  useEffect(() => {
    if (userId && !isPending) {
      const currentCalculatedRank = calculateRank(debugAnswerCount);

      if (currentCalculatedRank > internalUserRank && internalUserRank > 0) {
        setPrevRank(internalUserRank);
        setNewRank(currentCalculatedRank);
        setShowRankUp(true);
      } else if (internalUserRank === 0 && currentCalculatedRank >= 1) {
        // Silently update initial rank
        updateUserRank(userId, currentCalculatedRank);
      }
    }
  }, [debugAnswerCount, userId, internalUserRank, isPending]);

  const handleRankUpClose = async () => {
    setShowRankUp(false);
    await updateUserRank(userId, newRank);
    setInternalUserRank(newRank);
  };


  const handleDebugResetRank = async () => {
    await updateUserRank(userId, 1);
    setInternalUserRank(1);
    setPrevRank(0);
    setNewRank(0);
    setDebugAnswerCount(3);
    setShowRankUp(false);
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

  const renderQuestionCard = (q: Question, isChild = false, hasChildren = false, childCount = 0, onToggle?: () => void, isExpanded = false, expandedContent?: React.ReactNode) => {
    let badgeVariant: 'success' | 'neutral' | 'warning' = 'warning';

    const s = q.status || 'matching';
    let statusIcon = 'schedule';

    if (s === 'answered') {
      badgeVariant = 'success';
      statusIcon = 'check_circle';
    } else if (s === 'matching_failed') {
      badgeVariant = 'neutral';
      statusIcon = 'block';
    }

    // Use Master Name or fallback
    const statusText = masterStatuses[s] || s;

    // Categories Display Logic
    const catIds = q.categories && q.categories.length > 0
      ? q.categories
      : q.category ? [q.category] : [];

    const isFavorite = favoriteIds.has(q.id);

    return (
      <Card
        key={q.id}
        className={`p-4 ${isChild ? 'border-l-4 border-l-blue-400 ml-6 mt-4 bg-gray-50' : ''}`}
        hoverable={!isChild}
      >
        <Link href={`/questions/${q.id}`} className="block space-y-2">
          {/* Status Badge & Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-800 text-base flex-1">{q.title}</h3>

            <div className="flex items-center gap-2 shrink-0">
              {(
                <Badge variant={badgeVariant as any} icon={statusIcon as any} className="text-xs">
                  {statusText}
                </Badge>
              )}

              {/* Favorite Star */}
              <button
                onClick={(e) => handleToggleFavorite(e, q.id)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                title={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
              >
                <Icon
                  name="star"
                  size={24}
                  className={isFavorite ? "text-yellow-400" : "text-gray-300"}
                  fill={true}
                />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{q.description}</p>

          <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <Icon name="schedule" size={14} />
              {new Date(q.postedAt || q.createdAt).toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {catIds.map((catId, idx) => (
                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 bg-primary/10 border border-primary/30 rounded-full text-xs font-semibold text-gray-800">
                  {masterCategories[catId] || catId}
                </span>
              ))}
            </div>

            <span className="flex items-center gap-1 ml-auto">
              <Icon name="chat" size={14} />
              {q.answerCount} 件の回答
            </span>
          </div>
        </Link>
        {
          hasChildren && onToggle && (
            <div className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onToggle();
                }}
                className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium hover:bg-transparent"
              >
                <Icon name={isExpanded ? 'expand_less' : 'expand_more'} size={16} />
                {isExpanded ? '追加の質問を隠す' : '追加の質問を表示'}（{childCount}件）
              </Button>
            </div>
          )
        }
        {/* Expanded Content (Nested Children) */}
        {isExpanded && expandedContent && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {expandedContent}
          </div>
        )}
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
            <Link href="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
            </Link>
            <div className="flex items-center gap-2">
              {/* Notification Button Removed as requested */}

              {/* Settings Icon */}
              <Link href="/settings" className="p-2 rounded-full hover:bg-gray-100 text-gray-700" title="設定">
                <Icon name="settings" size={24} />
              </Link>

              {/* Profile Link Removed as requested */}
              <Button
                href="/questions/post"
                className="hidden md:flex text-lg px-8 py-3"
                size="lg"
                icon="add"
                iconSize={28}
              >
                質問を投稿
              </Button>
            </div>
          </div>
          <div className="md:hidden mt-3 flex items-center gap-2">
            <Link href="/settings" className="p-3 rounded-lg bg-gray-100 text-gray-700">
              <Icon name="settings" size={24} />
            </Link>
            <Button
              href="/questions/post"
              className="w-full py-4 text-lg flex-1"
              icon="add"
              iconSize={28}
            >
              質問を投稿
            </Button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* 貢献サマリー (Simplified) */}
        <div className="flex flex-col items-center gap-4">
          <Card className="p-6 w-full max-w-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">貢献度＆サンキュー</h3>
            <ContributionGraphic answerCount={debugAnswerCount} thankers={displayThankers} />
            <div className="mt-4 text-center">
              <Link href="/questions" className="text-blue-800 hover:text-blue-900 text-sm font-bold inline-flex items-center justify-center gap-1 group border border-blue-200 bg-blue-200 rounded-full px-4 py-2 hover:bg-blue-300 transition-colors">
                相談を受けてみる(みんなの質問)
              </Link>
            </div>
          </Card>

          {/* Debug Controls (Temporary) */}
          {process.env.NODE_ENV === 'development' && userId === 'dev-mock-user' && (
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

              <div className="flex items-center gap-2 ml-4 border-l pl-4">
                <Button variant="ghost" size="sm" onClick={handleDebugResetRank} className="text-xs text-red-500 font-bold border border-red-200 bg-red-50">
                  Reset & Set Ans=3
                </Button>
                {/* Quick Presets */}
                <div className="flex gap-1 ml-2">
                  <button onClick={() => setDebugAnswerCount(0)} className="px-2 py-1 text-xs border rounded bg-white hover:bg-gray-50">0</button>
                  <button onClick={() => setDebugAnswerCount(3)} className="px-2 py-1 text-xs border rounded bg-white hover:bg-gray-50">3</button>
                  <button onClick={() => setDebugAnswerCount(4)} className="px-2 py-1 text-xs border rounded bg-white hover:bg-gray-50">4</button>
                  <button onClick={() => setDebugAnswerCount(10)} className="px-2 py-1 text-xs border rounded bg-white hover:bg-gray-50">10</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rank Up Overlay */}
        {showRankUp && (
          <RankUpOverlay oldRank={prevRank} newRank={newRank} onClose={handleRankUpClose} />
        )}

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
        {/* タブ切り替え */}
        <div className="bg-white border border-gray-200 rounded-lg px-4">
          <div className="flex gap-0">
            {[
              { id: 'my-questions', label: '質問', icon: 'help' },
              { id: 'answered', label: '回答', icon: 'check_circle' },
              { id: 'favorites', label: 'お気に入り', icon: 'star' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id as TabType)}
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
        {/* フィルタ */}
        {tab === 'my-questions' && (
          <Card className="p-4 space-y-4">
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={filters['my-questions'].keyword}
                    onChange={(e) => updateFilterState('my-questions', 'keyword', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="質問のタイトルや内容で検索..."
                  />
                  <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <Button onClick={handleKeywordCommit} size="sm" className="px-6">検索</Button>
              </div>
            </div>

            <MasterFilter
              title="ステータスで絞り込み"
              masterType="status"
              multiple={false}
              grouped={false}
              value={filters['my-questions'].status}
              onChange={handleQuestionStatusChange}
              options={initialStatuses}
            />
            <MasterFilter
              title="カテゴリで絞り込み"
              masterType="category"
              multiple
              grouped
              value={filters['my-questions'].categories}
              onChange={handleQuestionCategoryChange}
              options={initialCategories}
            />
          </Card>
        )}

        {tab === 'answered' && (
          <Card className="p-4 space-y-4">
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={filters['answered'].keyword}
                    onChange={(e) => updateFilterState('answered', 'keyword', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="質問のタイトルや内容で検索..."
                  />
                  <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <Button onClick={handleKeywordCommit} size="sm" className="px-6">検索</Button>
              </div>
            </div>

            <MasterFilter
              title="ステータスで絞り込み"
              masterType="status"
              multiple={false}
              grouped={false}
              value={filters['answered'].status}
              onChange={handleAnswerStatusChange}
              options={initialStatuses}
            />
            <MasterFilter
              title="カテゴリで絞り込み"
              masterType="category"
              multiple
              grouped
              value={filters['answered'].categories}
              onChange={handleAnswerCategoryChange}
              options={initialCategories}
            />
          </Card>
        )}

        {tab === 'favorites' && (
          <Card className="p-4 space-y-4">
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={filters['favorites'].keyword}
                    onChange={(e) => updateFilterState('favorites', 'keyword', e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="質問のタイトルや内容で検索..."
                  />
                  <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <Button onClick={handleKeywordCommit} size="sm" className="px-6">検索</Button>
              </div>
            </div>

            <MasterFilter
              title="ステータスで絞り込み"
              masterType="status"
              multiple={false}
              grouped={false}
              value={filters['favorites'].status}
              onChange={handleFavoriteStatusChange}
              options={initialStatuses}
            />
            <MasterFilter
              title="カテゴリで絞り込み"
              masterType="category"
              multiple
              grouped
              value={filters['favorites'].categories}
              onChange={handleFavoriteCategoryChange}
              options={initialCategories}
            />
          </Card>
        )}

        {/* 質問一覧 */}
        <div className="space-y-4">
          {chains.length === 0 && !isPending && (
            <Card className="p-8 text-center text-gray-500">
              <Icon name="inbox" size={48} className="mx-auto mb-2 text-gray-400" />
              <p>まだ質問がありません</p>
            </Card>
          )}

          {chains.map(({ root, children }) => {
            const isExpanded = expandedChains.has(root.id);
            // Render children as content to be expanded inside root
            const expandedContent = (
              <div className="space-y-4">
                {children.map((child) => renderQuestionCard(child, true))}
              </div>
            );

            return (
              <div key={root.id} className="space-y-2">
                {renderQuestionCard(
                  root,
                  false,
                  children.length > 0,
                  children.length,
                  () => toggleChain(root.id),
                  isExpanded,
                  expandedContent
                )}
                {/* Removed sibling expansion */}
              </div>
            );
          })}

          {isPending && (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!isPending && hasMore[tab]?.hasMore && chains.length > 0 && (
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
