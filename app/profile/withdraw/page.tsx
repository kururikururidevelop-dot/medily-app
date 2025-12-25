'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { getAuthenticatedUser, getAuthHeaders } from '@/lib/client-auth';

export default function WithdrawPage() {
  const router = useRouter();
  useRequireAuth();
  const [reason, setReason] = useState('');
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConfirmed = confirmChecked;

  const handleWithdraw = async () => {
    if (!isConfirmed) return;

    setLoading(true);
    try {
      const { userId } = await getAuthenticatedUser();
      const headers = await getAuthHeaders();

      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) throw new Error('退会処理に失敗しました');

      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      router.push('/');
    } catch (err) {
      console.error('[Withdraw] Failed to withdraw:', err);
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-center">
          <h1 className="text-xl font-bold text-gray-800">退会画面</h1>
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
                ⚠️ 退会に関する重要なお知らせ
              </h2>
              <ul className="space-y-3 text-red-700 text-sm leading-relaxed">
                <li>
                  • 退会後は、登録されたアカウント情報はすべて削除されます。一度削除されたデータは復旧できません。
                </li>
                <li>
                  • 投稿した質問や回答の内容は、サービス内に保持される場合があります。
                </li>
                <li>
                  • 退会手続きを完了すると、ただちにアカウントが無効になります。
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
          {/* 退会理由選択 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              退会理由<span className="text-gray-500 ml-1">（任意）</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">選択してください</option>
              <option value="service-not-fit">サービスが合わない</option>
              <option value="no-longer-needed">必要なくなった</option>
              <option value="privacy-concern">プライバシー上の懸念</option>
              <option value="other">その他</option>
            </select>
          </div>

          {/* 注意事項確認チェック */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
                className="w-5 h-5 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">
                上記の注意事項を理解し、退会に同意します
              </span>
            </label>
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
              {loading ? '退会中...' : '退会実行'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
