'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import Icon from '@/components/Icon';

interface QuestionFormData {
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
    setFormData(data);
    
    // 親質問IDがあれば取得
    if (data.parentQuestionId) {
      fetchParentQuestion(data.parentQuestionId);
    }
  }, [router]);

  const fetchParentQuestion = async (questionId: string) => {
    try {
      const res = await fetch(`/api/questions/${questionId}`);
      if (res.ok) {
        const data = await res.json();
        setParentQuestion({
          id: data.id,
          categoryId: data.categoryId,
          region: data.region,
          body: data.body || data.description,
        });
      }
    } catch (error) {
      console.error('Failed to fetch parent question:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // API呼び出し（質問投稿）
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('質問の投稿に失敗しました');
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
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600" disabled={isSubmitting}>
            <Icon name="arrow_back" size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">質問投稿確認</h1>
          <div className="w-6" />
        </div>
      </div>

      <main className="max-w-screen-sm mx-auto px-6 py-8 w-full">
        <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {/* 確認メッセージ */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              以下の内容で質問を投稿します。内容をご確認ください。
            </p>
          </div>

          {/* 前の質問表示（追加質問の場合のみ） */}
          {formData.parentQuestionId && parentQuestion && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-blue-900 mb-3">前の質問</h2>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-2">
                  <span className="inline-block px-2 py-1 bg-white rounded text-xs font-medium">
                    {asDisplayName(parentQuestion.categoryId, categoryNames)}
                  </span>
                  <span className="inline-block px-2 py-1 bg-white rounded text-xs font-medium">
                    {asDisplayName(parentQuestion.region, regionNames)}
                  </span>
                </div>
                <p className="text-gray-800 mt-3">{parentQuestion.body}</p>
              </div>
            </div>
          )}

          {/* テンプレートは削除仕様（表示なし） */}

          {/* 相談内容 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-medium text-gray-600 mb-2">相談内容</h2>
            <p className="text-base whitespace-pre-wrap">{formData.body}</p>
          </div>

          {/* 回答選択肢 */}
          {formData.choices.some((c) => c.trim()) && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h2 className="text-sm font-medium text-gray-600 mb-2">回答選択肢</h2>
              <div className="space-y-2">
                {formData.choices
                  .filter((c) => c.trim())
                  .map((choice, index) => (
                    <div key={index} className="text-base flex items-center gap-2">
                      <span className="w-6 text-sm font-semibold text-gray-700">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{choice}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 地域 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-medium text-gray-600 mb-2">地域</h2>
            <p className="text-base">{asDisplayName(primaryRegion, regionNames)}</p>
          </div>

          {/* フィルタ条件 */}
          {(formData.genderFilter !== 'none' || formData.ageGroups.length > 0) && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h2 className="text-sm font-medium text-gray-600 mb-3">回答者フィルタ</h2>
              <div className="space-y-2">
                {formData.genderFilter !== 'none' && (
                  <div>
                    <span className="text-sm text-gray-600">性別: </span>
                    <span className="text-base">
                      {formData.genderFilter === 'male' ? '男性' : formData.genderFilter === 'female' ? '女性' : 'その他・指定しない'}
                    </span>
                  </div>
                )}
                {formData.ageGroups.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-600">年齢: </span>
                    <span className="text-base">{formData.ageGroups.join('、')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 公開レベル */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-medium text-gray-600 mb-2">公開レベル</h2>
            <p className="text-base">
              {formData.public ? '公開（すべてのユーザーが閲覧可能）' : '非公開（回答者のみ閲覧可能）'}
            </p>
          </div>

          {/* ボタン */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              戻る
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 bg-[#2DB596] text-white rounded-lg font-medium hover:bg-[#26a383] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '投稿中...' : '投稿確定'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
