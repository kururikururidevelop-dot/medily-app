'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface SettingsClientProps {
  initialNotificationConsent: boolean;
}

export default function SettingsPage({ initialNotificationConsent }: SettingsClientProps) {
  const router = useRouter();
  useRequireAuth();

  // Initialize state from server props
  // Note: lineNotification tracks the "saved" state, temp tracks the form state.
  const [lineNotification, setLineNotification] = useState(initialNotificationConsent);
  const [tempLineNotification, setTempLineNotification] = useState(initialNotificationConsent);

  // No loading state needed as data is ready.
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Removed useEffect fetching logic.

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const { auth } = await import('@/lib/firebase');
      await auth?.authStateReady();
      const user = auth?.currentUser;

      if (!user) {
        setError('認証エラー: 再ログインしてください');
        return;
      }
      const token = await user.getIdToken();
      const userId = user.uid;

      const response = await fetch('/api/users/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          notificationConsent: tempLineNotification,
        }),
      });
      if (response.ok) {
        setLineNotification(tempLineNotification);
        router.push('/profile');
      } else {
        setError('設定の保存に失敗しました');
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
      setError('設定の保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTempLineNotification(lineNotification);
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">設定</h1>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
          {/* LINE通知許可 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="lineNotification"
                checked={tempLineNotification}
                onChange={(e) => setTempLineNotification(e.target.checked)}
                className="w-5 h-5 text-primary focus:ring-primary rounded mt-0.5"
              />
              <div className="flex-1">
                <label htmlFor="lineNotification" className="block font-semibold text-gray-800 cursor-pointer">
                  LINE通知許可
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  回答通知をLINEで受け取ります
                </p>
              </div>
            </div>
          </div>

          {/* 情報セクション */}
          <div className="space-y-2">
            <Link
              href="/terms"
              className="flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-800">利用規約</span>
              <Icon name="arrow_forward" size={20} className="text-gray-400" />
            </Link>
            <Link
              href="/privacy"
              className="flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:bg-gray-50"
            >
              <span className="font-semibold text-gray-800">
                プライバシーポリシー
              </span>
              <Icon name="arrow_forward" size={20} className="text-gray-400" />
            </Link>
            <Link
              href="/profile/withdraw"
              className="flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-red-200 transition-all hover:bg-red-50"
            >
              <span className="font-semibold text-red-600">退会</span>
              <Icon name="arrow_forward" size={20} className="text-red-400" />
            </Link>
          </div>

          {/* ボタン */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors disabled:opacity-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

