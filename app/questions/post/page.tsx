'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';

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
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
];
import { useRouter, useSearchParams } from 'next/navigation';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import Icon from '@/components/Icon';
import MasterFilter from '@/components/MasterFilter';
// TemplateSelect は仕様変更により未使用

interface QuestionFormData {
  title: string;
  body: string;
  categoryIds: string[];
  choices: string[];
  regionIds: string[];
  genderFilter: 'male' | 'female' | 'none';
  ageGroups: string[];
  public: boolean;
  parentQuestionId?: string;
}

interface ParentQuestion {
  id: string;
  categoryId: string;
  region: string;
  body: string;
}

function QuestionPostContent() {
  useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<QuestionFormData>({
    title: '',
    body: '',
    categoryIds: [],
    choices: ['', ''],
    regionIds: [],
    genderFilter: 'none',
    ageGroups: [],
    public: true,
    parentQuestionId: undefined,
  });

  const [parentQuestion, setParentQuestion] = useState<ParentQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [profileRegion, setProfileRegion] = useState<string>('');
  const [profileCategories, setProfileCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const regionValue = useMemo(() => formData.regionIds, [formData.regionIds]);
  const categoryValue = useMemo(() => formData.categoryIds, [formData.categoryIds]);
  const [showChoices, setShowChoices] = useState<boolean>(false);

  const grouped = categories.reduce<Record<string, Category[]>>((acc, c) => {
    const key = c.group || 'その他';
    acc[key] = acc[key] || [];
    acc[key].push(c);
    acc[key].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    return acc;
  }, {});

  // 初期ロード: 親質問取得 + プロフィール初期値 + カテゴリ取得
  useEffect(() => {
    const parentId = searchParams.get('parentQuestionId') || undefined;
    if (parentId) {
      setFormData((prev) => ({ ...prev, parentQuestionId: parentId }));
      fetchParentQuestion(parentId);
    }
    fetchProfileDefaults();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/system/categories');
      if (!res.ok) return;
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProfileDefaults = async () => {
    try {
      const userId = localStorage.getItem('userId') || 'dev-mock-user';
      const res = await fetch(`/api/users/profile?userId=${userId}`);
      if (!res.ok) return;
      const data = await res.json();
      const region = data.user?.region as string | undefined;
      const categories = (data.user?.categories as string[] | undefined) || [];
      if (region) {
        setProfileRegion(region);
        setFormData((prev) => ({ ...prev, regionIds: prev.regionIds.length ? prev.regionIds : [region] }));
      }
      if (categories.length > 0) {
        setProfileCategories(categories);
        setFormData((prev) => ({ ...prev, categoryIds: prev.categoryIds.length ? prev.categoryIds : [categories[0]] }));
      }
    } catch (err) {
      console.error('Failed to fetch profile defaults', err);
    }
  };

  const fetchParentQuestion = async (questionId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/questions/${questionId}`);
      if (res.ok) {
        const data = await res.json();
        const question = data.question || data;
        setParentQuestion({
          id: question.id,
          categoryId: question.category || question.categoryId,
          region: question.region,
          body: question.body || question.description || question.content,
        });
      }
    } catch (error) {
      console.error('Failed to fetch parent question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = formData.title.trim();
    if (!trimmedTitle || trimmedTitle.length > 60) {
      alert('質問タイトルを1〜60文字で入力してください');
      return;
    }
    if (!formData.body.trim()) {
      alert('相談内容を入力してください');
      return;
    }
    if (!formData.categoryIds[0]) {
      alert('カテゴリを選択してください');
      return;
    }
    if (!formData.regionIds[0]) {
      alert('地域を選択してください');
      return;
    }

    localStorage.setItem('questionDraft', JSON.stringify(formData));
    router.push('/questions/post/confirm');
  };

  const handleCancel = () => {
    if (confirm('入力内容は破棄されます。よろしいですか？')) {
      router.push('/home');
    }
  };

  const addChoice = () => {
    if (formData.choices.length < 6) {
      setFormData({ ...formData, choices: [...formData.choices, ''] });
    }
  };

  const removeChoice = (index: number) => {
    if (formData.choices.length > 2) {
      const newChoices = formData.choices.filter((_, i) => i !== index);
      setFormData({ ...formData, choices: newChoices });
    }
  };

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...formData.choices];
    newChoices[index] = value;
    setFormData({ ...formData, choices: newChoices });
  };

  const handleBack = () => {
    // フォーム入力中は確認を入れる、またはヘッダーの戻るは単純に戻る（要件次第だが、未保存破棄の観点からCancelと同じが安全）
    // しかし「戻る」ボタンはブラウザバック相当なので、confirmなしで戻るとデータが残るかも？（ブラウザによる）
    // ユーザー要望「遷移前の状態になっている」＝router.back()ならスクロール位置などは戻る。
    // 入力破棄のアラートは「キャンセル」ボタンの仕様。ヘッダーの「戻る」は通常ナビゲーション。
    // ここではヘッダー戻るも handleCancel と合わせるか、単に back するか。
    // キャンセルボタンは「入力内容は破棄されます」と出るので、明示的。
    // ヘッダー戻るは router.back() にする。
    router.back();
  };

  const handleCategoryChange = (categoryName: string) => {
    const next = formData.categoryIds.includes(categoryName)
      ? formData.categoryIds.filter((c) => c !== categoryName)
      : [...formData.categoryIds, categoryName];
    setFormData({ ...formData, categoryIds: next });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600 hover:text-gray-900 transition-colors">
            <Icon name="arrow_back" size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">質問を投稿</h1>
          <div className="w-6" /> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-screen-sm mx-auto px-6 py-8 w-full">
        {formData.parentQuestionId && parentQuestion && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-blue-900 mb-3">前の質問</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex gap-2">
                <span className="inline-block px-2 py-1 bg-white rounded text-xs font-medium">
                  {parentQuestion.categoryId}
                </span>
                <span className="inline-block px-2 py-1 bg-white rounded text-xs font-medium">
                  {parentQuestion.region}
                </span>
              </div>
              <p className="text-gray-800 mt-3">{parentQuestion.body}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">

          {/* 質問タイトル */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              質問タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="例）発熱が続くときの受診目安は？"
              maxLength={60}
              required
            />
            <p className="text-xs text-gray-500">1〜60文字で入力してください。通知や一覧で表示されます。</p>
          </div>

          {/* 相談内容 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              相談内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 min-h-48 md:min-h-56 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="できるだけ具体的な相談内容を入力してください"
              required
            />
            <div className="text-sm text-right text-gray-600">
              {formData.body.length}文字
            </div>
          </div>

          {/* 回答例から選択してもらう（トグル表示） */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <input
                type="checkbox"
                checked={showChoices}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setShowChoices(checked);
                  if (!checked) {
                    // 初期化（非表示時は値をクリア）
                    setFormData((prev) => ({ ...prev, choices: ['', ''] }));
                  }
                }}
                className="w-4 h-4 border-gray-300 text-primary rounded focus:ring-primary"
              />
              回答例から選択してもらう
            </label>
            {showChoices && (
              <div className="space-y-3">
                {formData.choices.map((choice, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-6 h-6 inline-flex items-center justify-center text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-gray-100">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) => updateChoice(index, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={`選択肢 ${index + 1}`}
                    />
                    {formData.choices.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Icon name="delete" size={20} />
                      </button>
                    )}
                  </div>
                ))}
                {formData.choices.length < 6 && (
                  <button
                    type="button"
                    onClick={addChoice}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary"
                  >
                    + 選択肢を追加
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 注意書き */}
          <div className="space-y-3">
            <hr className="border-gray-200" />
            <div className="bg-primary-ultralight border border-primary/30 rounded-lg p-4 text-sm text-gray-800">
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">
                  <Icon name="info" size={18} />
                </span>
                <div>
                  <span className="font-semibold">以下の項目はマッチングに使用されています</span><br />
                  できるだけ正確に入力いただくことで、よりあなたに合った回答者とつながりやすくなります。
                </div>
              </div>
            </div>
          </div>

          {/* 地域（プロフィール編集と同じ select 方式） */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              地域 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.regionIds[0] || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, regionIds: e.target.value ? [e.target.value] : [] }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">選択してください</option>
              {PREFECTURES.map((prefecture) => (
                <option key={prefecture} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </select>
          </div>

          {/* フィルタオプション */}
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">回答相手の性別（任意）</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="genderFilter"
                      value="male"
                      checked={formData.genderFilter === 'male'}
                      onChange={(e) => setFormData({ ...formData, genderFilter: e.target.value as 'male' | 'female' | 'none' })}
                      className="mr-2"
                    />
                    男性
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="genderFilter"
                      value="female"
                      checked={formData.genderFilter === 'female'}
                      onChange={(e) => setFormData({ ...formData, genderFilter: e.target.value as 'male' | 'female' | 'none' })}
                      className="mr-2"
                    />
                    女性
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="genderFilter"
                      value="none"
                      checked={formData.genderFilter === 'none'}
                      onChange={(e) => setFormData({ ...formData, genderFilter: e.target.value as 'male' | 'female' | 'none' })}
                      className="mr-2"
                    />
                    その他・指定しない
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">回答相手の年代（任意）</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['10代', '20代', '30代', '40代', '50代', '60代', 'その他の年代', '指定しない'].map((label) => (
                    <label
                      key={label}
                      className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-colors ${formData.ageGroups.includes(label)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.ageGroups.includes(label)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...formData.ageGroups, label]
                            : formData.ageGroups.filter((l) => l !== label);
                          setFormData({ ...formData, ageGroups: next });
                        }}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  関連するカテゴリ（任意）
                </label>
                <div className="space-y-6">
                  {Object.entries(grouped).map(([groupName, items]) => (
                    <section key={groupName}>
                      <h3 className="text-sm font-bold text-gray-700 mb-2">{groupName}</h3>
                      <div className="space-y-2">
                        {items.map((cat) => (
                          <label
                            key={cat.id}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.categoryIds.includes(cat.name)
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-300 hover:bg-gray-50'
                              }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.categoryIds.includes(cat.name)}
                              onChange={() => handleCategoryChange(cat.name)}
                              className="w-4 h-4 text-primary focus:ring-primary rounded"
                            />
                            <Icon name={cat.icon} size={20} className="ml-3 text-primary" />
                            <span className="ml-2 text-gray-900">{cat.name}</span>
                          </label>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 公開レベル */}
          <div className="space-y-2 pt-2">
            <label className="block text-sm font-bold text-gray-800 mb-1">
              公開レベル <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="public"
                  checked={!formData.public}
                  onChange={() => setFormData({ ...formData, public: false })}
                  className="mr-2"
                />
                非公開（回答者のみ閲覧可能）
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="public"
                  checked={formData.public}
                  onChange={() => setFormData({ ...formData, public: true })}
                  className="mr-2"
                />
                公開（サービス利用者以外も閲覧可能）
              </label>
              <p className="text-xs text-gray-600">公開のほうが回答者を見つけやすくなります。</p>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark"
            >
              投稿確認
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function QuestionPostPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <QuestionPostContent />
    </Suspense>
  );
}
