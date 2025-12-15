// app/questions/[questionId]/page.tsx
// E030 質問詳細・回答（Web）: 質問と回答の閲覧 + 追加質問導線 + 前後ナビ

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
}

export default function QuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.questionId as string;

  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevQuestionId, setPrevQuestionId] = useState<string | null>(null);
  const [nextQuestionId, setNextQuestionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        if (!response.ok) throw new Error('質問の取得に失敗しました');

        const data = await response.json();
        setQuestion(data.question);
        setAnswers(data.answers || []);
      } catch (err) {
        console.error('[Question Detail] Failed to fetch question:', err);
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);
  // 任意: 前/次の質問IDを取得（実装がない場合は非表示）
  useEffect(() => {
    const fetchSiblings = async () => {
      try {
        const res = await fetch(`/api/questions/${questionId}/siblings`);
        if (!res.ok) return;
        const data = await res.json();
        setPrevQuestionId(data.prevQuestionId || null);
        setNextQuestionId(data.nextQuestionId || null);
      } catch {
        /* no-op */
      }
    };
    fetchSiblings();
  }, [questionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <Icon name="autorenew" size={40} className="text-blue-600" />
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
            <div className="flex items-center gap-2">
              {/* 追加質問ボタン - 次の質問がない場合のみ表示（チェーンの最後） */}
              {!nextQuestionId && (
                <button
                  onClick={() => router.push(`/questions/post?parentQuestionId=${questionId}`)}
                  className="px-4 py-2 bg-[#2DB596] hover:bg-[#1E8F75] text-white rounded-lg font-semibold"
                >
                  追加質問
                </button>
              )}
            </div>
          </div>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

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
                    <span className="text-xs text-gray-400">回答</span>
                  </div>

                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
                    {answer.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 前へ・次へ ナビゲーション */}
        {(prevQuestionId || nextQuestionId) && (
          <div className="mt-8 flex items-center justify-between">
            <button
              disabled={!prevQuestionId}
              onClick={() => prevQuestionId && router.push(`/questions/${prevQuestionId}`)}
              className={`px-4 py-2 rounded-lg border ${
                prevQuestionId
                  ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Icon name="chevron_left" size={18} className="inline mr-1" /> 前の質問
            </button>
            <button
              disabled={!nextQuestionId}
              onClick={() => nextQuestionId && router.push(`/questions/${nextQuestionId}`)}
              className={`px-4 py-2 rounded-lg border ${
                nextQuestionId
                  ? 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              次の質問 <Icon name="chevron_right" size={18} className="inline ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
