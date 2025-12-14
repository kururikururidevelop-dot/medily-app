'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface ToggleSetting {
  id: string;
  label: string;
  value: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  useRequireAuth();
  const [notificationSettings, setNotificationSettings] = useState<ToggleSetting[]>([
    { id: 'email', label: 'メール通知', value: true },
    { id: 'push', label: 'プッシュ通知', value: true },
    { id: 'sms', label: 'SMS通知', value: false },
  ]);

  const [privacySettings, setPrivacySettings] = useState<ToggleSetting[]>([
    { id: 'profile', label: 'プロフィール公開', value: true },
    { id: 'message', label: 'メッセージ受付', value: true },
  ]);

  const handleToggle = (
    type: 'notification' | 'privacy',
    id: string,
    value: boolean
  ) => {
    if (type === 'notification') {
      setNotificationSettings(
        notificationSettings.map((s) =>
          s.id === id ? { ...s, value } : s
        )
      );
    } else {
      setPrivacySettings(
        privacySettings.map((s) =>
          s.id === id ? { ...s, value } : s
        )
      );
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
            <h1 className="text-2xl font-bold text-gray-800">設定</h1>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* 通知設定 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="notifications" size={24} className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">通知設定</h2>
          </div>
          <div className="space-y-4">
            {notificationSettings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
              >
                <label className="font-semibold text-gray-800 cursor-pointer">
                  {setting.label}
                </label>
                <button
                  onClick={() => handleToggle('notification', setting.id, !setting.value)}
                  className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                    setting.value ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      setting.value ? 'translate-x-7' : 'translate-x-1'
                    } mt-1`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* プライバシー設定 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="privacy_tip" size={24} className="text-green-600" />
            <h2 className="text-lg font-bold text-gray-800">プライバシー設定</h2>
          </div>
          <div className="space-y-4">
            {privacySettings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
              >
                <label className="font-semibold text-gray-800 cursor-pointer">
                  {setting.label}
                </label>
                <button
                  onClick={() => handleToggle('privacy', setting.id, !setting.value)}
                  className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                    setting.value ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      setting.value ? 'translate-x-7' : 'translate-x-1'
                    } mt-1`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 情報 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="info" size={24} className="text-purple-600" />
            <h2 className="text-lg font-bold text-gray-800">情報</h2>
          </div>
          <div className="space-y-3">
            <Link
              href="/docs/terms"
              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">利用規約</span>
              <Icon name="open_in_new" size={20} className="text-gray-400" />
            </Link>
            <Link
              href="/docs/privacy"
              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">
                プライバシーポリシー
              </span>
              <Icon name="open_in_new" size={20} className="text-gray-400" />
            </Link>
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <span className="font-semibold text-gray-800">バージョン</span>
              <span className="text-gray-600">v0.1.0</span>
            </div>
          </div>
        </div>

        {/* ログアウト */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            router.push('/auth/login');
          }}
          className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
