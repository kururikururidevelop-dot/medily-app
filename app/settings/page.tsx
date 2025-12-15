'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function SettingsPage() {
  const router = useRouter();
  useRequireAuth();
  const [lineNotification, setLineNotification] = useState(true);
  const [tempLineNotification, setTempLineNotification] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userId = localStorage.getItem('userId') || 'dev-mock-user';
        const response = await fetch(`/api/users/profile?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          const consent = data.user?.notificationConsent === true;
          setLineNotification(consent);
          setTempLineNotification(consent);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
        setError('設定の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const userId = localStorage.getItem('userId') || 'mock_user';
      const response = await fetch('/api/users/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <Icon name="autorenew" size={40} className="text-[#2DB596]" />
          </div>
          <p className="text-gray-600 mt-3">読み込み中...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-gray-800">設定</h1>
          </div>
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
                className="w-5 h-5 text-[#2DB596] focus:ring-[#2DB596] rounded mt-0.5"
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
              className="px-6 py-3 bg-[#2DB596] hover:bg-[#1E8F75] text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
