'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import { getAuthenticatedUser, getAuthHeaders } from '@/lib/client-auth';

const PREFECTURES = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
];

interface Category {
  id: string;
  name: string;
  icon: string;
  group?: string;
  description?: string;
  order?: number;
}

interface ProfileData {
  displayName: string;
  region: string;
  gender?: string;
  birthYear?: string;
  categories: string[];
  notificationConsent: boolean;
  avatarUrl?: string; // Added avatarUrl
}

export default function ProfileEditPage() {
  const router = useRouter();
  useRequireAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileData>({
    displayName: '',
    region: '東京都',
    gender: '',
    birthYear: '',
    categories: [],
    notificationConsent: false,
    avatarUrl: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [imgError, setImgError] = useState(false); // Added for image error handling

  const grouped = categories.reduce<Record<string, Category[]>>((acc, c) => {
    const key = c.group || 'その他';
    acc[key] = acc[key] || [];
    acc[key].push(c);
    acc[key].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    return acc;
  }, {});

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const { userId, token } = await getAuthenticatedUser();
        const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

        const [catRes, profRes] = await Promise.all([
          fetch('/api/system/categories'),
          fetch(`/api/users/profile?userId=${userId}`, { headers }),
        ]);

        const catData = await catRes.json();
        setCategories(catData.categories || []);

        if (!profRes.ok) throw new Error('プロフィール取得に失敗しました');
        const data = await profRes.json();
        if (data.user) {
          setFormData({
            displayName: data.user.displayName || '',
            region: data.user.region || '東京都',
            gender: data.user.gender || '',
            birthYear: data.user.birthYear || '',
            categories: data.user.categories || [],
            notificationConsent: data.user.notificationConsent === true,
            avatarUrl: data.user.pictureUrl || '', // Map pictureUrl to avatarUrl
          });
        }
      } catch (err) {
        console.error('[Profile Edit] Failed to fetch data:', err);
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => {
      const isSelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.displayName.trim()) {
      setError('ニックネームを入力してください');
      return;
    }
    if (!formData.region) {
      setError('地域を選択してください');
      return;
    }
    if (!formData.notificationConsent) {
      setError('通知の受信に同意してください');
      return;
    }

    setSaving(true);
    try {
      const { userId } = await getAuthenticatedUser();
      const headers = await getAuthHeaders();

      const response = await fetch('/api/users/profile', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId,
          displayName: formData.displayName,
          region: formData.region,
          gender: formData.gender === 'other' ? '' : formData.gender,
          birthYear: formData.birthYear,
          categories: formData.categories,
          notificationConsent: formData.notificationConsent,
          avatar: formData.avatarUrl,
        }),
      });

      if (!response.ok) throw new Error('プロフィール保存に失敗しました');

      router.push('/profile');
    } catch (err) {
      console.error('[Profile Edit] Failed to save profile:', err);
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* メインコンテンツ */}
      <div className="max-w-screen-sm mx-auto px-6 py-8 w-full">
        <div className="text-center mb-8">
          {/* アバター */}
          <div className="flex justify-center mb-4">
            {formData.avatarUrl && !imgError ? (
              <div className="w-20 h-20 rounded-full border-2 border-white shadow-md overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-sm border border-gray-200">
                <Icon name="account_circle" size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">プロフィール編集</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            プロフィール編集後に保存してください。<br />
            （プロフィール画像の編集はLINEで行ってください）
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          {/* ニックネーム */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              ニックネーム <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              placeholder="例：たなかん"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              サービス内で表示される名前です
            </p>
          </div>

          {/* お住まいの地域 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              お住まいの地域 <span className="text-red-500">*</span>
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              required
            >
              <option value="">選択してください</option>
              {PREFECTURES.map((prefecture) => (
                <option key={prefecture} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              地域に合わせた情報をお届けします
            </p>
          </div>

          {/* 性別（任意） */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">性別（任意）</label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-gray-900 dark:text-white">男性</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-gray-900 dark:text-white">女性</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-gray-900 dark:text-white">その他・回答しない</span>
              </label>
            </div>
          </div>

          {/* 生まれ年（任意） */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">生まれ年（任意）</label>
            <select
              name="birthYear"
              value={formData.birthYear}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              <option value="">選択してください</option>
              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 18 - i).map((year) => (
                <option key={year} value={String(year)}>
                  {year}年
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              年齢層に応じた情報提供に役立てます
            </p>
          </div>

          {/* 回答対象カテゴリ（任意・複数） */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              回答を受け取りたい または 経験がある カテゴリ（任意・複数選択可）
            </label>
            <div className="space-y-6">
              {Object.entries(grouped).map(([groupName, items]) => (
                <section key={groupName}>
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{groupName}</h3>
                  <div className="space-y-2">
                    {items.map((cat) => (
                      <label
                        key={cat.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.categories.includes(cat.name)
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(cat.name)}
                          onChange={() => handleCategoryChange(cat.name)}
                          className="w-4 h-4 text-primary focus:ring-primary rounded"
                        />
                        <Icon name={cat.icon} size={20} className="ml-3 text-primary" />
                        <span className="ml-2 text-gray-900 dark:text-white">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              選択したカテゴリの質問が優先的に届きます
            </p>
          </div>

          {/* 通知の受信同意 */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationConsent}
                onChange={(e) => setFormData((prev) => ({ ...prev, notificationConsent: e.target.checked }))}
                className="w-5 h-5 text-primary focus:ring-primary rounded mt-0.5"
                required
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  通知の受信に同意します <span className="text-red-500">*</span>
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">回答通知をLINEで受け取ることに同意します</p>
              </div>
            </label>
          </div>

          {/* ボタン */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 border border-gray-300 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={saving || !formData.notificationConsent}
              className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
