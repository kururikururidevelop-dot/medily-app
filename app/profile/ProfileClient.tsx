'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
// D010 はタブ構成とし、貢献系はホームへ移設
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { UserProfile } from '@/lib/services/userService';

interface ProfileClientProps {
  initialProfile: UserProfile | null;
}

export default function ProfilePage({ initialProfile }: ProfileClientProps) {
  const router = useRouter();
  useRequireAuth();
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);
  // If initialProfile is provided, we are not loading.
  const [loading, setLoading] = useState(!initialProfile);
  const [error, setError] = useState<string | null>(null);

  // We rely on Server Side Fetching.
  // If initialProfile is null, it means server couldn't fetch it (and didn't fallback to mock?).
  // In that case, we might show error or empty.
  // If it's null, we just show "Profile not found".

  const menuItems = [
    {
      label: 'プロフィール編集',
      icon: 'edit',
      href: '/profile/edit',
    },
    {
      label: '設定',
      icon: 'settings',
      href: '/settings',
    },
  ];

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('displayName');
      localStorage.removeItem('avatarUrl');
      // Cookies should also be cleared? 
      // The app seems to rely on localStorage for Client auth check?
      // But we are moving to Cookie based SSR?
      // Ideally logout should hit an API route to clear cookies.
      // But for now, sticking to existing logic.
      router.push('/auth/login');
    }
  };

  if (!profile && loading) {
    // This state might not happen if we passed initialProfile=null and set loading=true?
    // Actually if initialProfile is null, we set loading=true? 
    // No, if initialProfile is null, it means we failed. Loading should be false.
    // Let's force loading=false if we rendered.
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="error" size={48} className="text-red-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">プロフィールが見つかりません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <Icon name="arrow_back" size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">マイページ</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* プロフィール情報 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <Icon name="account_circle" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {profile.displayName}
            </h2>
          </div>

          {/* プロフィール詳細 */}
          <div className="space-y-3 text-sm">
            {/* お住まいの地域 */}
            <div className="flex items-start border-b border-gray-100 pb-3">
              <div className="w-36 text-gray-800 font-extrabold flex-shrink-0">お住まいの地域</div>
              <div className="flex-1 text-gray-800">{profile.region}</div>
            </div>

            {/* 性別（任意） */}
            <div className="flex items-start border-b border-gray-100 pb-3">
              <div className="w-36 text-gray-800 font-extrabold flex-shrink-0">性別（任意）</div>
              <div className="flex-1 text-gray-800">{profile.gender || '未設定'}</div>
            </div>

            {/* 生まれ年（任意） */}
            <div className="flex items-start border-b border-gray-100 pb-3">
              <div className="w-36 text-gray-800 font-extrabold flex-shrink-0">生まれ年（任意）</div>
              <div className="flex-1 text-gray-800">{profile.birthYear ? `${profile.birthYear}年` : '未設定'}</div>
            </div>

            {/* カテゴリ（複数） */}
            <div className="flex items-start border-b border-gray-100 pb-3">
              <div className="w-36 text-gray-800 font-extrabold flex-shrink-0">カテゴリ</div>
              <div className="flex-1">
                {profile.categories && profile.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.categories.map((category, index) => (
                      <span key={index} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {category}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-800">未設定</span>
                )}
              </div>
            </div>

            {/* 通知の受信 */}
            <div className="flex items-start pb-3">
              <div className="w-36 text-gray-800 font-extrabold flex-shrink-0">通知の受信</div>
              <div className="flex-1 text-gray-800">{profile.notificationConsent === true ? '同意済み' : '未設定'}</div>
            </div>
          </div>
        </div>

        {/* マイページはプロフィール・設定導線中心。タブはホーム画面へ移設済み */}

        {/* メニュー */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:bg-gray-50"
            >
              <Icon name={item.icon} size={20} className="flex-shrink-0 text-[#2DB596]" />
              <span className="flex-1 font-semibold text-gray-800">
                {item.label}
              </span>
              <Icon name="arrow_forward" size={20} className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* ログアウトボタン */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
          >
            ログアウト
          </button>
        </div>
      </div>

      {/* フッター */}
      <div className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-3xl mx-auto px-4">
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
