'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
// D010 はタブ構成とし、貢献系はホームへ移設
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface UserProfile {
  id: string;
  name: string;
  region: string;
    gender?: string;
    birthYear?: string;
  primaryCategory?: string;
  categories?: string[];
  questionsCount: number;
  answersCount: number;
  contributionScore: number;
  notificationConsent?: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  useRequireAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId || userId === 'undefined') {
          // 開発用：userIdがない場合はdev-mock-userを使用
          localStorage.setItem('userId', 'dev-mock-user');
          localStorage.setItem('displayName', 'デモユーザー');
        }

        const effectiveUserId = userId && userId !== 'undefined' ? userId : 'dev-mock-user';
        const response = await fetch(`/api/users/profile?userId=${effectiveUserId}`);
        
        if (!response.ok) {
          throw new Error('プロフィール取得に失敗しました');
        }

        const data = await response.json();
        
        // APIレスポンスのuserフィールドをprofile形式に変換
        if (data.user) {
          setProfile({
            id: effectiveUserId,
            name: data.user.displayName || 'ユーザー',
            region: data.user.region || '未設定',
              gender: data.user.gender,
              birthYear: data.user.birthYear,
              primaryCategory: data.user.primaryCategory,
              categories: data.user.categories || [],
              notificationConsent: data.user.notificationConsent,
            questionsCount: 0,
            answersCount: 0,
            contributionScore: 0,
          });
        } else {
          throw new Error('プロフィールデータが見つかりません');
        }
      } catch (err) {
        console.error('[Profile] Failed to fetch profile:', err);
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

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
      router.push('/auth/login');
    }
  };

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
          <Link href="/home" className="flex items-center gap-2">
            <Icon name="arrow_back" size={24} className="text-gray-700" />
          </Link>
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
              {profile.name}
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
