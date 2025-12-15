'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Icon from '@/components/Icon';

const CATEGORIES = ['医学', '栄養', '心理', '運動', '健康管理', 'メンタルヘルス', 'その他'];

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

interface QuestionFormData {
  title: string;
  description: string;
  category: string;
  region: string;
}

type StepType = 'input' | 'confirm' | 'complete';

export default function LiffQuestionPostPage() {
  const router = useRouter();
  const [step, setStep] = useState<StepType>('input');
  const [liffReady, setLiffReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<QuestionFormData>({
    title: '',
    description: '',
    category: CATEGORIES[0],
    region: '東京都',
  });

  // LIFF 初期化
  useEffect(() => {
    const initLiff = async () => {
      try {
        const liff = (await import('@line/liff')).default;
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        setUserId(profile.userId);
        setLiffReady(true);
      } catch (err) {
        console.error('LIFF initialization failed:', err);
        // 開発環境用フォールバック
        setUserId('mock-user-id');
        setLiffReady(true);
      }
    };

    initLiff();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (!formData.title.trim()) {
      setError('タイトルを入力してください');
      return;
    }
    if (!formData.description.trim()) {
      setError('質問内容を入力してください');
      return;
    }
    setError(null);
    setStep('confirm');
  };

  const handleBack = () => {
    setStep('input');
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          region: formData.region,
          userId,
        }),
      });

      if (!response.ok) throw new Error('質問投稿に失敗しました');

      const data = await response.json();
      setStep('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
      setLoading(false);
    }
  };

  if (!liffReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <Icon name="autorenew" size={40} className="text-blue-600" />
          </div>
          <p className="text-gray-600 mt-3">初期化中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* ヘッダー */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">医療の質問を投稿</h1>
          <p className="text-sm text-gray-600 mt-1">
            ステップ {step === 'input' ? '1' : step === 'confirm' ? '2' : '3'} / 3
          </p>
        </div>
      </div>

      {/* ステップ 1: 入力 */}
      {step === 'input' && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* タイトル */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                質問のタイトル *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="例：頭痛が続いています。何科を受診すべき？"
                maxLength={100}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.title.length} / 100
              </p>
            </div>

            {/* カテゴリ */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                カテゴリ
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 地域 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                地域
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PREFECTURES.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>

            {/* 質問内容 */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                質問の詳細 *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="詳しい状況や症状を入力してください..."
                rows={6}
                maxLength={1000}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length} / 1000
              </p>
            </div>

            {/* ボタン */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                次へ
                <Icon name="arrow_forward" size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ステップ 2: 確認 */}
      {step === 'confirm' && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              入力内容の確認
            </h2>

            <div className="space-y-6 mb-8">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  タイトル
                </p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded">
                  {formData.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">
                    カテゴリ
                  </p>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded">
                    {formData.category}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-1">
                    地域
                  </p>
                  <p className="text-gray-800 bg-gray-50 p-3 rounded">
                    {formData.region}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  質問の詳細
                </p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                  {formData.description}
                </p>
              </div>
            </div>

            {/* ボタン */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors flex items-center gap-2"
              >
                <Icon name="arrow_back" size={18} />
                修正
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon name="check" size={18} className="text-white" />
                {loading ? '投稿中...' : '質問を投稿'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ステップ 3: 完了 */}
      {step === 'complete' && (
        <div className="max-w-3xl mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block mb-6 p-4 bg-green-100 rounded-full">
              <Icon name="check_circle" size={64} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              質問を投稿しました
            </h2>
            <p className="text-gray-600 mb-8">
              ご質問ありがとうございます。回答をお待ちください。
            </p>
            <button
              onClick={() => router.push('/home')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              ホームへ戻る
              <Icon name="arrow_forward" size={18} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
