'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { Question, Answer } from '@/lib/services/questionService';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/Avatar';

interface QuestionDetailClientProps {
    initialQuestion: Question | null;
    initialAnswers: Answer[];
    initialPrevId: string | null;
    initialNextId: string | null;
    masterCategories: Record<string, string>;
    error?: string;
    // userId: string; // Removed prop reliance
}

import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function QuestionDetailClient({
    initialQuestion,
    initialAnswers,
    initialPrevId,
    initialNextId,
    masterCategories,
    error: initialError,
}: QuestionDetailClientProps) {
    useRequireAuth();
    const router = useRouter();

    const [isConditionsOpen, setIsConditionsOpen] = useState(false);
    const [question, setQuestion] = useState<Question | null>(initialQuestion);
    const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
    const [prevQuestionId, setPrevQuestionId] = useState<string | null>(initialPrevId);
    const [nextQuestionId, setNextQuestionId] = useState<string | null>(initialNextId);
    const [error, setError] = useState<string | null>(initialError || null);

    // Client-side User ID for ownership check
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const uid = localStorage.getItem('userId');
            setCurrentUserId(uid);
        }
    }, []);

    // Sync state with props (Debugging: Ensure fresh data on navigation)
    useEffect(() => {
        setQuestion(initialQuestion);
        setAnswers(initialAnswers);
    }, [initialQuestion, initialAnswers]);



    // Logic for "Additional Question" (Add Child)
    // Allowed if: (No Parent i.e. Root) OR (Has Parent AND Latest)
    // Root question has no parent -> Can always add (start chain/branch)
    // Child question -> Can only add if it's the latest in its chain
    const shouldShowAddButton = !question?.parentQuestionId || !nextQuestionId;

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Icon name="error" size={48} className="text-red-600 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        戻る
                    </button>
                </div>
            </div>
        );
    }

    if (!question) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Icon name="error" size={48} className="text-red-600 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">質問が見つかりません</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        戻る
                    </button>
                </div>
            </div>
        );
    }

    // Categories Display Logic
    // Categories Display Logic
    const catIds = question.categories || [];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">


            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-4 py-8">

                {/* Prev/Next Navigation (Moved to Top) */}
                {(prevQuestionId || nextQuestionId) && (
                    <div className="mb-6 flex items-center justify-between">
                        <button
                            disabled={!prevQuestionId}
                            onClick={() => prevQuestionId && router.replace(`/questions/${prevQuestionId}`)}
                            className={`px-4 py-2 rounded-lg border flex items-center gap-1 transition-colors ${prevQuestionId
                                ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Icon name="chevron_left" size={18} /> 前の質問
                        </button>
                        <button
                            disabled={!nextQuestionId}
                            onClick={() => nextQuestionId && router.replace(`/questions/${nextQuestionId}`)}
                            className={`px-4 py-2 rounded-lg border flex items-center gap-1 transition-colors ${nextQuestionId
                                ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                                : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            次の質問 <Icon name="chevron_right" size={18} />
                        </button>
                    </div>
                )}

                {/* Question Detail */}
                <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200 shadow-sm space-y-8">

                    {/* Date Header */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Icon name="schedule" size={14} />
                            {question.postedAt || question.createdAt}
                        </span>
                    </div>

                    {/* Title & Body */}
                    <div className="space-y-4">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                            <Avatar src={question.authorAvatarUrl} alt={question.authorName || 'ユーザー'} size="sm" />
                            <span className="font-bold text-gray-800">{question.authorName || 'ユーザー'}</span>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 break-words leading-tight">{question.title}</h1>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{question.description}</p>
                    </div>

                    {/* Choices (回答例) */}
                    {question.choices && question.choices.length > 0 && question.choices.some(c => c.trim()) && (
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-900">回答例</p>
                            <div className="space-y-1">
                                {question.choices.filter(c => c.trim()).map((choice, i) => (
                                    <div key={i} className="text-base flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                        <span className="w-6 h-6 inline-flex items-center justify-center text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-white">
                                            {String.fromCharCode(65 + i)}
                                        </span>
                                        <span className="text-gray-800 font-medium">{choice}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Collapsible Matching Conditions */}
                    <div>
                        <button
                            onClick={() => setIsConditionsOpen(!isConditionsOpen)}
                            className="flex items-center gap-2 text-gray-700 hover:text-primary font-semibold py-2 w-full text-left transition-colors"
                        >
                            <Icon name={isConditionsOpen ? 'expand_less' : 'expand_more'} size={24} />
                            <span>マッチング条件</span>
                        </button>

                        {isConditionsOpen && (
                            <div className="mt-4 space-y-6 p-4 border border-gray-200 rounded-lg">

                                {/* Region */}
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-gray-900">地域</p>
                                    <p className="text-base text-gray-800">{question.region}</p>
                                </div>

                                {/* Gender */}
                                {question.genderFilter && question.genderFilter !== 'none' && (
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-gray-900">回答相手の性別</p>
                                        <p className="text-base text-gray-800">
                                            {question.genderFilter === 'male' ? '男性' : question.genderFilter === 'female' ? '女性' : 'その他・指定しない'}
                                        </p>
                                    </div>
                                )}

                                {/* Age */}
                                {question.ageGroups && question.ageGroups.length > 0 && (
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-gray-900">回答相手の年代</p>
                                        <div className="flex flex-wrap gap-2">
                                            {question.ageGroups.map(age => (
                                                <span key={age} className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold text-gray-800">
                                                    {age}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Categories */}
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-gray-900">関連するカテゴリ</p>
                                    <div className="flex flex-wrap gap-2">
                                        {catIds.map((catId, idx) => (
                                            <span key={idx} className="inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold text-gray-800">
                                                {masterCategories[catId] || catId}
                                            </span>
                                        ))}
                                        {catIds.length === 0 && (
                                            <span className="text-xs text-gray-400">カテゴリーなし</span>
                                        )}
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>

                    {/* Re-open / Continue Recruiting Button */}
                    {question.status === 'answered' && currentUserId === question.userId && (
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={async () => {
                                    if (!confirm('回答の募集を再開しますか？\nステータスが「マッチング中」になり、新たな回答者を探します。')) return;

                                    try {
                                        // Since we don't have a dedicated endpoint for status update yet, 
                                        // we might need to assume one exists or create one.
                                        // For now, let's assume a generic update endpoint or use a server action if this was a server component.
                                        // But this is a Client Component.
                                        // I will call a new endpoint: /api/questions/[questionId]/status

                                        const res = await fetch(`/api/questions/${question.id}/status`, {
                                            method: 'PATCH',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ status: 'matching' })
                                        });

                                        if (!res.ok) throw new Error('Failed to update status');

                                        // Optimistic Update
                                        setQuestion({ ...question, status: 'matching' });
                                        alert('回答の募集を再開しました。');

                                        // Refresh page to ensure consistency
                                        router.refresh();

                                    } catch (e) {
                                        console.error(e);
                                        alert('更新に失敗しました。');
                                    }
                                }}
                                className="px-6 py-3 bg-white border-2 border-primary text-primary hover:bg-primary-ultralight rounded-lg font-bold text-base flex items-center gap-2 shadow-sm transition-colors"
                            >
                                <Icon name="campaign" size={24} />
                                質問の受付を続ける
                            </button>
                        </div>
                    )}

                    {/* Action Buttons (Add Question) - Only show if logic permits */}
                    {shouldShowAddButton && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => router.push(`/questions/post?parentQuestionId=${question.id}`)}
                                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold text-base flex items-center gap-2 shadow-sm transition-colors"
                            >
                                <Icon name="add_circle" size={20} />
                                追加質問
                            </button>
                        </div>
                    )}

                </div>

                {/* Answer Form Removed */}

                {/* Answer List */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-bold text-gray-800">回答 ({answers.length})</h2>
                    </div>

                    {answers.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 text-gray-400">
                            <Icon name="message" size={40} className="mx-auto mb-2 opacity-50" />
                            <p>まだ回答がありません</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {[...answers]
                                .sort((a, b) => new Date(b.answeredAt || b.createdAt).getTime() - new Date(a.answeredAt || a.createdAt).getTime())
                                .map((answer) => (
                                    <div key={answer.id} className="bg-white rounded-lg p-6 border border-gray-200">

                                        {/* Row 1: Date */}
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                                            <Icon name="schedule" size={14} />
                                            <span>
                                                {new Date(answer.answeredAt || answer.createdAt).toLocaleString('ja-JP', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>

                                        {/* Row 2: Profile Image & Name */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <Avatar
                                                src={answer.authorAvatarUrl}
                                                alt={answer.authorName || '回答者'}
                                                size="md"
                                            />
                                            <p className="font-bold text-gray-900 text-base">
                                                {answer.authorName || '回答者'}
                                            </p>
                                        </div>

                                        {/* Row 3+: Content THEN Choices */}
                                        <div className="space-y-3 pl-1">
                                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
                                                {answer.content}
                                            </p>

                                            {answer.choices && answer.choices.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {answer.choices.map((c, i) => (
                                                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
