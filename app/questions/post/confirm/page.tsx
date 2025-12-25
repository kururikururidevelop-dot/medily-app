'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import Icon from '@/components/Icon';

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

const categoryNames: Record<string, string> = {
  dermatology: '皮膚科',
  internal_medicine: '内科',
  pediatrics: '小児科',
  orthopedics: '整形外科',
  psychiatry: '精神科',
};

const regionNames: Record<string, string> = {
  hokkaido: '北海道',
  tohoku: '東北',
  kanto: '関東',
  chubu: '中部',
  kinki: '近畿',
  chugoku: '中国',
  shikoku: '四国',
  kyushu: '九州・沖縄',
};

const asDisplayName = (id: string, map: Record<string, string>) => map[id] || id;
const badgeClass =
  'inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm font-semibold text-gray-800';

export default function QuestionConfirmPage() {
  useRequireAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<QuestionFormData | null>(null);
  const [parentQuestion, setParentQuestion] = useState<ParentQuestion | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const draft = localStorage.getItem('questionDraft');
    if (!draft) {
      router.replace('/questions/post');
      return;
    }
    const data = JSON.parse(draft);
    setFormData({ title: '', ...data });

    // 親質問IDがあれば取得
    if (data.parentQuestionId) {
      fetchParentQuestion(data.parentQuestionId);
    }
  }, [router]);

  const fetchParentQuestion = async (questionId: string) => {
    try {
      const { auth } = await import('@/lib/firebase');
      await auth?.authStateReady();
      const user = auth?.currentUser;

      const headers: HeadersInit = {};
      if (user) {
        const token = await user.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/questions/${questionId}`, { headers });
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
    }
  };

  const handleSubmit = async () => {
    if (!formData || isSubmitting) return;

    const trimmedTitle = formData.title?.trim() || '';
    if (!trimmedTitle || trimmedTitle.length > 60) {
      alert('質問タイトルを1〜60文字で入力してください');
      return;
    }

    const description = (formData.body || '').trim();
    if (!description) {
      alert('相談内容を入力してください');
      return;
    }

    setIsSubmitting(true);

    try {
      // API呼び出し（質問投稿）
      const { auth } = await import('@/lib/firebase');
      await auth?.authStateReady();
      const user = auth?.currentUser;

      if (!user) {
        alert('認証エラー: 再ログインしてください');
        router.push('/auth/login');
        return;
      }

      const token = await user.getIdToken();

      const primaryCategory = formData.categoryIds?.[0] || '';
      const primaryRegion = formData.regionIds?.[0] || '';
      const payload = {
        ...formData,
        userId: user.uid, // Ensure we send the correct UID from auth, or trust API to use token? API uses body.userId currently but validates it against token.
        title: trimmedTitle,
        description,
        region: primaryRegion,
        category: primaryCategory,
      };
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || '質問の投稿に失敗しました');
      }

      // ドラフトをクリア
      localStorage.removeItem('questionDraft');

      // 完了画面へ遷移
      router.push('/questions/post/complete');
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('質問の投稿に失敗しました。もう一度お試しください。');
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  const primaryCategory = formData.categoryIds?.[0] || '';
  const primaryRegion = formData.regionIds?.[0] || '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">質問投稿確認</h1>
        </div>
      </div>

      <main className="max-w-screen-sm mx-auto px-6 py-8 w-full">
        <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {/* 確認メッセージ（Q010と同様のスタイルに統一） */}
          <div className="bg-primary-ultralight border border-primary/30 rounded-lg p-4 text-sm text-gray-800">
            <div className="flex items-start gap-2">
              <span className="text-primary mt-0.5">
                <Icon name="info" size={18} />
              </span>
              <div>
                <span className="font-semibold">以下の内容で質問を投稿します。内容をご確認ください。</span>
              </div>
            </div>
          </div>

          {/* 前の質問表示（追加質問の場合のみ） */}
          {formData.parentQuestionId && parentQuestion && (
            <div className="space-y-2 text-sm text-gray-700">
              <h2 className="text-sm font-semibold text-gray-900">前の質問</h2>
              <div className="flex flex-wrap gap-2">
                <span className={badgeClass}>{asDisplayName(parentQuestion.categoryId, categoryNames)}</span>
                <span className={badgeClass}>{asDisplayName(parentQuestion.region, regionNames)}</span>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{parentQuestion.body}</p>
            </div>
          )}

          <hr className="border-gray-200" />

          {/* テンプレートは削除仕様（表示なし） */}

          {/* タイトルと相談内容（同じ枠に統合） */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 whitespace-pre-wrap break-words">{formData.title}</h2>
            <p className="text-base leading-relaxed whitespace-pre-wrap">{formData.body}</p>
          </div>

          {/* 相談内容は上の枠に統合済み */}

          <hr className="border-gray-200" />

          {/* 回答選択肢 */}
          {formData.choices.some((c) => c.trim()) && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">回答選択肢</p>
              <div className="space-y-2">
                {formData.choices
                  .filter((c) => c.trim())
                  .map((choice, index) => (
                    <div key={index} className="text-base flex items-center gap-2">
                      <span className="w-6 h-6 inline-flex items-center justify-center text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-gray-100">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{choice}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {formData.choices.some((c) => c.trim()) && <hr className="border-gray-200" />}

          {/* 地域 */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">地域</p>
            <p className="text-base">{asDisplayName(primaryRegion, regionNames)}</p>
          </div>

          <hr className="border-gray-200" />

          {/* 回答相手の性別 */}
          {formData.genderFilter !== 'none' && (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">回答相手の性別</p>
              <p className="text-base">
                {formData.genderFilter === 'male' ? '男性' : formData.genderFilter === 'female' ? '女性' : 'その他・指定しない'}
              </p>
            </div>
          )}

          {formData.genderFilter !== 'none' && <hr className="border-gray-200" />}

          {/* 回答相手の年代 */}
          {formData.ageGroups.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">回答相手の年代</p>
              <div className="flex flex-wrap gap-2">
                {formData.ageGroups.map((age) => (
                  <span key={age} className={badgeClass}>
                    {age}
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.ageGroups.length > 0 && <hr className="border-gray-200" />}

          {/* 関連するカテゴリ */}
          {formData.categoryIds.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">関連するカテゴリ</p>
              <div className="flex flex-wrap gap-2">
                {formData.categoryIds.map((cat) => (
                  <span key={cat} className={badgeClass}>
                    {asDisplayName(cat, categoryNames)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {formData.categoryIds.length > 0 && <hr className="border-gray-200" />}

          {/* 公開レベル */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">公開レベル</p>
            <p className="text-base">
              {formData.public ? '公開（すべてのユーザーが閲覧可能）' : '非公開（回答者のみ閲覧可能）'}
            </p>
          </div>

          {/* ボタン */}
          <div className="flex gap-4 pt-2">

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '投稿中...' : '投稿確定'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
