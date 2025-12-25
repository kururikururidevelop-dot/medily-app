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
  const [loading, setLoading] = useState(!initialProfile);
  const [error, setError] = useState<string | null>(null);

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

  const getGenderLabel = (gender: string) => {
    if (gender === 'male') return '男性';
    if (gender === 'female') return '女性';
    if (gender === 'other') return 'その他';
    return gender || '未設定'; // If existing data is already Japanese or other
  };

  const getCategoryIcon = (label: string): string => {
    const map: Record<string, string> = {
      '基本的な診療科': 'medical_services',
      'お悩み・症状別': 'psychology',
      'ライフステージ・属性別': 'groups',
      '病院選びの体験': 'reviews',
      '内科一般': 'healing',
      '小児科': 'child_care',
      '皮膚科': 'spa',
      '眼科': 'visibility',
      '歯科・矯正歯科': 'dentistry',
      '耳鼻咽喉科': 'hearing',
      '整形外科': 'accessibility',
      '産婦人科': 'pregnant_woman',
      'メンタルヘルス': 'psychology',
      '胃腸・消化器': 'restaurant',
      'アレルギー・免疫': 'healing',
      'リハビリ・介護': 'elderly',
      'ダイエット・栄養': 'nutrition',
      '検査・人間ドック': 'analytics',
      '子育て・乳幼児': 'family_restroom',
      '女性特有の悩み': 'female',
      '高齢者の健康': 'elderly',
      '闘病・長期療養': 'health_and_safety',
      '通いやすさ・設備': 'map',
      '接遇・対応': 'sentiment_satisfied',
      '費用・保険': 'savings',
      'セカンドオピニオン': 'switch_access_shortcut',
    };
    return map[label] || 'category';
  };

  if (!profile && loading) {
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* メインコンテンツ */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* プロフィール情報 */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold overflow-hidden border border-emerald-200 mb-3">
              {profile.pictureUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.pictureUrl}
                  alt="プロフィール"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="account_circle" size={48} className="text-emerald-700/50" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
              {profile.displayName}
            </h2>
          </div>

          {/* プロフィール詳細 */}
          <div className="space-y-4 text-sm mt-8">
            {/* お住まいの地域 */}
            <div className="flex items-center border-b border-gray-100 pb-3">
              <div className="w-36 text-gray-500 font-semibold flex-shrink-0">
                お住まいの地域
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-sm font-semibold text-gray-600">
                  <Icon name="location_on" size={16} className="mr-0.5" />
                  {profile.region}
                </div>
              </div>
            </div>

            {/* 性別（任意） */}
            <div className="flex items-center border-b border-gray-100 pb-3">
              <div className="w-36 text-gray-500 font-semibold flex-shrink-0">
                性別
              </div>
              <div className="flex-1 text-gray-800 font-medium">{getGenderLabel(profile.gender || '')}</div>
            </div>

            {/* 生まれ年（任意） */}
            <div className="flex items-center border-b border-gray-100 pb-3">
              <div className="w-36 text-gray-500 font-semibold flex-shrink-0">
                生まれ年
              </div>
              <div className="flex-1 text-gray-800 font-medium">{profile.birthYear ? `${profile.birthYear}年` : '未設定'}</div>
            </div>

            {/* カテゴリ（複数） */}
            <div className="flex items-start border-b border-gray-100 pb-3">
              <div className="w-36 text-gray-500 font-semibold flex-shrink-0 mt-1">
                興味ある分野
              </div>
              <div className="flex-1">
                {profile.categories && profile.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.categories.map((category, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold text-gray-800">
                        {category}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400">未設定</span>
                )}
              </div>
            </div>

            {/* 通知の受信 */}
            <div className="flex items-center pb-3">
              <div className="w-36 text-gray-500 font-semibold flex-shrink-0">
                通知設定
              </div>
              <div className="flex-1 text-gray-800 font-medium">{profile.notificationConsent === true ? '受け取る' : '受け取らない'}</div>
            </div>
          </div>
        </div>

        {/* メニュー */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:bg-gray-50 shadow-sm"
            >
              <div className="p-2 bg-gray-50 rounded-full text-primary">
                <Icon name={item.icon} size={24} />
              </div>
              <span className="flex-1 font-bold text-gray-800">
                {item.label}
              </span>
              <Icon name="arrow_forward_ios" size={16} className="text-gray-300" />
            </Link>
          ))}
        </div>

        {/* ログアウトボタン */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-4 bg-white border border-red-100 text-red-600 hover:bg-red-50 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="logout" size={20} />
            ログアウト
          </button>
        </div>
      </div>

      {/* フッター */}
      <div className="py-8 text-center">
        <div className="flex justify-center gap-6 text-sm text-gray-500 mb-4">
          <Link href="/terms" className="hover:text-primary transition-colors">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            プライバシーポリシー
          </Link>
        </div>
        <p className="text-xs text-gray-400">© 2025 Medily. All rights reserved.</p>
      </div>
    </div>
  );
}
