'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ContributionGraphic from '@/components/ContributionGraphic';

interface UserProfile {
  id: string;
  name: string;
  region: string;
  categories: string[];
  questionsCount: number;
  answersCount: number;
  contributionScore: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          router.push('/auth/login');
          return;
        }

        const response = await fetch(`/api/users/${userId}/profile`);
        if (!response.ok) throw new Error('プロフィール取得に失敗しました');

        const data = await response.json();
        setProfile(data.profile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

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

  const menuItems = [
    {
      label: 'プロフィール編集',
      icon: 'edit',
      href: '/profile/edit',
    },
    {
      label: '質問一覧',
      icon: 'help',
      href: '/home?tab=my-questions',
    },
    {
      label: '回答一覧',
      icon: 'chat',
      href: '/answers',
    },
    {
      label: '設定',
      icon: 'settings',
      href: '/settings',
    },
    {
      label: '退会',
      icon: 'logout',
      href: '/profile/withdraw',
      className: 'text-red-600 hover:bg-red-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">マイページ</h1>
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
            <p className="text-gray-600 text-center mt-2">{profile.region}</p>
          </div>

          {/* カテゴリ */}
          {profile.categories.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600 mb-2">
                主なカテゴリ
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-blue-600">
              {profile.questionsCount}
            </div>
            <p className="text-sm text-gray-600 mt-2">投稿数</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-green-600">
              {profile.answersCount}
            </div>
            <p className="text-sm text-gray-600 mt-2">回答数</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-purple-600">
              {profile.contributionScore}
            </div>
            <p className="text-sm text-gray-600 mt-2">貢献度スコア</p>
          </div>
        </div>

        {/* 貢献度グラフ */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">貢献度推移</h3>
          <ContributionGraphic />
        </div>

        {/* メニュー */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all ${item.className || 'hover:bg-gray-50'}`}
            >
              <Icon name={item.icon} size={20} className="flex-shrink-0" />
              <span className="flex-1 font-semibold text-gray-800">
                {item.label}
              </span>
              <Icon name="arrow_forward" size={20} className="text-gray-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
