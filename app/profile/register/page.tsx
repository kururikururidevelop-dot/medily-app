// app/profile/register/page.tsx
// 初回プロフィール登録画面（A030）

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

interface Category {
  id: string;
  name: string;
  icon: string;
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
  const [category, setCategory] = useState('');
  const [medicalBackground, setMedicalBackground] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          category,
          medicalBackground,
        }),
      });

      if (!res.ok) throw new Error('プロフィール登録に失敗しました');

      router.push('/home');
    } catch (err) {
      setError('プロフィール登録に失敗しました。もう一度お試しください。');
      console.error('Profile registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-screen-sm mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">プロフィール登録</h1>
          <p className="text-gray-600">あなたの情報を入力して、最適なマッチングを受け取りましょう。</p>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 名前 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="例：田中 太郎"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 地域 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              地域 <span className="text-red-500">*</span>
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">選択してください</option>
              {PREFECTURES.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </div>

          {/* カテゴリ */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              主な関心領域 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={category === cat.id}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                    required
                  />
                  <Icon name={cat.icon} size={20} className="ml-3 text-gray-600" />
                  <span className="ml-2 text-gray-900">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 医学背景 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              医学・健康の背景（任意）
            </label>
            <select
              value={medicalBackground}
              onChange={(e) => setMedicalBackground(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">選択してください</option>
              {BACKGROUNDS.map((bg) => (
                <option key={bg.id} value={bg.id}>
                  {bg.label}
                </option>
              ))}
            </select>
          </div>

          {/* エラー表示 */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? '登録中...' : 'プロフィールを登録'}
          </button>
        </form>
      </div>
    </div>
  );
}

