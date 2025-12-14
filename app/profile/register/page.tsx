// app/profile/register/page.tsx
// 初回プロフィール登録画面（A030）

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface Category {
  id: string;
  name: string;
  icon: string;
  group?: string;
  description?: string;
  order?: number;
}

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
  '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];

const BACKGROUNDS = [
  { id: 'patient', label: '患者・家族' },
  { id: 'healthcare_worker', label: '医療従事者' },
  { id: 'student', label: '学生' },
  { id: 'other', label: 'その他' },
];

export default function ProfileRegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [region, setRegion] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [notificationConsent, setNotificationConsent] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const grouped = categories.reduce<Record<string, Category[]>>((acc, c) => {
    const key = c.group || 'その他';
    acc[key] = acc[key] || [];
    acc[key].push(c);
    acc[key].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    return acc;
  }, {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useRequireAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/system/categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notificationConsent) {
      setError('通知の受信に同意いただく必要があります');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId') || 'mock_user';

      const res = await fetch('/api/users/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          displayName,
          region,
          gender,
          birthYear,
          categories: selectedCategories,
          notificationConsent,
        }),
      });

      if (!res.ok) throw new Error('プロフィール登録に失敗しました');

      // displayName を localStorage に保存
      localStorage.setItem('displayName', displayName);

      router.push('/home');
    } catch (err) {
      setError('プロフィール登録に失敗しました。もう一度お試しください。');
      console.error('Profile registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const birthYears = Array.from({ length: 100 }, (_, i) => currentYear - 18 - i);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      <div className="max-w-screen-sm mx-auto px-6 py-8 w-full">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          {/* ロゴ */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2DB596]/20 to-[#2DB596]/5 flex items-center justify-center shadow-sm border border-[#2DB596]/10">
              <Icon name="medical_services" size={40} className="text-[#2DB596]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">初回プロフィール登録</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Medilyを始めるために、あなたの基本情報を教えてください。
          </p>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          {/* ニックネーム */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              ニックネーム <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="例：たなかん"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB596] focus:border-transparent transition-colors"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              サービス内で表示される名前です
            </p>
          </div>

          {/* 地域 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              お住まいの地域 <span className="text-red-500">*</span>
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB596] focus:border-transparent transition-colors"
              required
            >
              <option value="">選択してください</option>
              {PREFECTURES.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              地域に合わせた情報をお届けします
            </p>
          </div>

          {/* 性別 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              性別（任意）
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-[#2DB596] focus:ring-[#2DB596]"
                />
                <span className="ml-2 text-gray-900 dark:text-white">男性</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-[#2DB596] focus:ring-[#2DB596]"
                />
                <span className="ml-2 text-gray-900 dark:text-white">女性</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-[#2DB596] focus:ring-[#2DB596]"
                />
                <span className="ml-2 text-gray-900 dark:text-white">その他・回答しない</span>
              </label>
            </div>
          </div>

          {/* 生まれ年 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              生まれ年（任意）
            </label>
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DB596] focus:border-transparent transition-colors"
            >
              <option value="">選択してください</option>
              {birthYears.map((year) => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              年齢層に応じた情報提供に役立てます
            </p>
          </div>

          {/* 回答対象カテゴリ（グルーピング表示） */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              回答を受け取りたい または 経験がある カテゴリ（任意・複数選択可）
            </label>
            <div className="space-y-6">
              {Object.entries(grouped).map(([groupName, items]) => (
                <section key={groupName}>
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {groupName}
                  </h3>
                  <div className="space-y-2">
                    {items.map((cat) => (
                      <label
                        key={cat.id}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedCategories.includes(cat.id)
                            ? 'border-[#2DB596] bg-[#2DB596]/5 dark:bg-[#2DB596]/10'
                            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={cat.id}
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => handleCategoryToggle(cat.id)}
                          className="w-4 h-4 text-[#2DB596] focus:ring-[#2DB596] rounded"
                        />
                        <Icon name={cat.icon} size={20} className="ml-3 text-[#2DB596]" />
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
                checked={notificationConsent}
                onChange={(e) => setNotificationConsent(e.target.checked)}
                className="w-5 h-5 text-[#2DB596] focus:ring-[#2DB596] rounded mt-0.5"
                required
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  通知の受信に同意します <span className="text-red-500">*</span>
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  回答通知をLINEで受け取ることに同意します
                </p>
              </div>
            </label>
          </div>

          {/* エラー表示 */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={loading || !notificationConsent}
            className="w-full py-3 bg-[#2DB596] hover:bg-[#1E8F75] text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '登録中...' : '登録完了'}
          </button>
        </form>

        {/* フッター */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            登録することで、
            <a
              href="/terms"
              className="underline hover:text-[#2DB596] transition-colors mx-1"
            >
              利用規約
            </a>
            および
            <a
              href="/privacy"
              className="underline hover:text-[#2DB596] transition-colors mx-1"
            >
              プライバシーポリシー
            </a>
            に同意したものとみなされます。
          </p>
        </footer>
      </div>
    </div>
  );
}

