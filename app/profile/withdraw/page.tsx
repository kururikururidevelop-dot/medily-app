'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function WithdrawPage() {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConfirmed = confirmText === '削除する';

  const handleWithdraw = async () => {
    if (!isConfirmed) return;

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) throw new Error('退会処理に失敗しました');

      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      router.push('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800"
            >
              <Icon name="arrow_back" size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">アカウント削除</h1>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* 警告セクション */}
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Icon name="warning" size={32} className="text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-red-700 mb-4">
                警告：このアクションは取り消せません
              </h2>
              <ul className="space-y-2 text-red-700">
                <li className="flex items-start gap-3">
                  <Icon name="close" size={20} className="mt-0.5 flex-shrink-0" />
                  <span>すべてのプロフィール情報が削除されます</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="close" size={20} className="mt-0.5 flex-shrink-0" />
                  <span>投稿した質問と回答が削除されます</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="close" size={20} className="mt-0.5 flex-shrink-0" />
                  <span>個人データが削除されます</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="close" size={20} className="mt-0.5 flex-shrink-0" />
                  <span>削除後のアカウント復旧はできません</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* フォーム */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          {/* 削除理由 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              退会理由（任意）
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="退会理由があればお聞かせください"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          {/* 確認テキスト */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              確認：下のテキストボックスに「削除する」と入力してください
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="削除する"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                confirmText === '削除する'
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-gray-500'
              }`}
            />
            {confirmText === '削除する' && (
              <p className="text-sm text-red-600 mt-2 font-semibold">
                確認が完了しました
              </p>
            )}
          </div>

          {/* ボタン */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleWithdraw}
              disabled={!isConfirmed || loading}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Icon name="trash" size={18} className="text-white" />
              {loading ? '削除中...' : 'アカウントを削除'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
