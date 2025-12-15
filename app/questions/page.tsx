'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import MasterFilter from '@/components/MasterFilter';

interface Question {
  id: string;
  title: string;
  description: string;
  category: string;
  region: string;
  authorName: string;
  createdAt: string;
  answerCount: number;
  status?: string;
}

export default function PublicQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
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
          <Link href="/" className="flex items-center gap-2">
            <Icon name="arrow_back" size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">質問一覧</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* 説明 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="info" size={24} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-emerald-900 mb-1">未回答の質問が一覧で表示されています</h2>
              <p className="text-sm text-emerald-700">
                回答するにはLINEでログインが必要です。あなたの経験が誰かの役に立ちます。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* フィルタ */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
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
        </div>
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
        {loading && page === 1 ? (
          <div className="flex justify-center items-center py-12">
            <div className="inline-block animate-spin">
              <Icon name="autorenew" size={40} className="text-emerald-600" />
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
              <div
                key={question.id}
                className="bg-white rounded-lg p-5 border border-gray-200 hover:border-emerald-300 transition-all shadow-sm"
              >
                {/* カテゴリ・地域 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                    <Icon name="category" size={14} />
                    {question.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                    <Icon name="location_on" size={14} />
                    {question.region}
                  </span>
                </div>

                {/* 質問タイトル */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{question.title}</h3>

                {/* 質問本文（抜粋） */}
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{question.description}</p>

                {/* 投稿者・日時 */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>
                    <Icon name="person" size={14} className="inline mr-1" />
                    {question.authorName}
                  </span>
                  <span>{question.createdAt}</span>
                </div>

                {/* 回答ボタン */}
                <div className="flex justify-end pt-3 border-t border-gray-200">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2DB596] hover:bg-[#1E8F75] text-white rounded-lg transition-colors font-semibold text-sm"
                  >
                    <Icon name="edit_square" size={18} className="text-white" />
                    回答する
                  </Link>
                </div>
              </div>
            ))}

            {/* もっと見るボタン */}
            {hasMore && !loading && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-white border-2 border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-700 rounded-lg transition-colors font-semibold"
                >
                  もっと見る
                </button>
              </div>
            )}

            {loading && page > 1 && (
              <div className="flex justify-center py-4">
                <div className="inline-block animate-spin">
                  <Icon name="autorenew" size={32} className="text-emerald-600" />
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
              <Link href="/terms" className="hover:text-emerald-600 transition-colors">
                利用規約
              </Link>
              <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
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
