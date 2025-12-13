// app/questions/[questionId]/page.tsx
// 質問詳細・回答画面（L020）

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  region: string;
  authorName: string;
  authorId: string;
  createdAt: string;
}

interface Answer {
  id: string;
  content: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export default function QuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.questionId as string;

  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answerContent, setAnswerContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        if (!response.ok) throw new Error('質問の取得に失敗しました');

        const data = await response.json();
        setQuestion(data.question);
        setAnswers(data.answers || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerContent.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: answerContent }),
      });

      if (!response.ok) throw new Error('回答の投稿に失敗しました');

      const newAnswer = await response.json();
      setAnswers((prev) => [newAnswer, ...prev]);
      setAnswerContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeAnswer = async (answerId: string) => {
    try {
      const response = await fetch(
        `/api/questions/${questionId}/answers/${answerId}/like`,
        { method: 'POST' }
      );

      if (!response.ok) throw new Error('いいね処理に失敗しました');

      setAnswers((prev) =>
        prev.map((a) =>
          a.id === answerId
            ? {
                ...a,
                isLiked: !a.isLiked,
                likes: a.isLiked ? a.likes - 1 : a.likes + 1,
              }
            : a
        )
      );
    } catch (err) {
      console.error('Failed to like answer:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <Icon name="loading" size={40} className="text-blue-600" />
          </div>
          <p className="text-gray-600 mt-3">読み込み中...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
          >
            <Icon name="arrow_back" size={24} />
            戻る
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon name="share" size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon name="more_vert" size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* 質問詳細 */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              {question.category}
            </span>
            <span className="text-sm text-gray-500">{question.region}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">{question.title}</h1>

          <p className="text-gray-700 whitespace-pre-wrap mb-6 leading-relaxed">
            {question.content}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-semibold text-gray-800">{question.authorName}</p>
              <p className="text-xs text-gray-500">{question.createdAt}</p>
            </div>
            <Icon name="help" size={20} className="text-gray-400" />
          </div>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* 回答投稿フォーム */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4">回答を投稿する</h2>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              placeholder="回答内容を入力してください..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAnswerContent('')}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
              >
                クリア
              </button>
              <button
                type="submit"
                disabled={submitting || !answerContent.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Icon name="send" size={18} className="text-white" />
                投稿
              </button>
            </div>
          </form>
        </div>

        {/* 回答一覧 */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">回答 ({answers.length})</h2>

          {answers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Icon name="message" size={40} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600">まだ回答がありません</p>
            </div>
          ) : (
            <div className="space-y-4">
              {answers.map((answer) => (
                <div
                  key={answer.id}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">{answer.authorName}</p>
                      <p className="text-xs text-gray-500">{answer.createdAt}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Icon name="more_vert" size={18} className="text-gray-400" />
                    </button>
                  </div>

                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
                    {answer.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLikeAnswer(answer.id)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                        answer.isLiked
                          ? 'text-red-600 bg-red-50'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon
                        name="thumbs_up"
                        size={18}
                        className={answer.isLiked ? 'text-red-600' : ''}
                      />
                      <span className="text-sm font-semibold">{answer.likes}</span>
                    </button>
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
