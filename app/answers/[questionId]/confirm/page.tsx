'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import Icon from '@/components/Icon';

interface Question {
  id: string;
  title?: string;
  body: string;
  categoryId: string;
  categories?: string[];
  region: string;
  choices?: string[];
  parentQuestionId?: string;
}

interface ParentQuestion {
  id: string;
  categoryId: string;
  region: string;
  body: string;
}

interface AnswerFormData {
  questionId: string;
  choice: string[];
  location: string;
  url: string;
  text: string;
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

export default function AnswerConfirmPage() {
  useRequireAuth();
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState<AnswerFormData | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [parentQuestion, setParentQuestion] = useState<ParentQuestion | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const draft = localStorage.getItem('answerDraft');
    if (!draft) {
      router.replace(`/answers/${params.questionId}`);
      return;
    }
    const parsed = JSON.parse(draft);
    setFormData(parsed.formData);
    setQuestion(parsed.question);

    // 親質問IDがあれば取得
    if (parsed.question?.parentQuestionId) {
      fetchParentQuestion(parsed.question.parentQuestionId);
    }
  }, [params.questionId, router]);

  const fetchParentQuestion = async (parentId: string) => {
    try {
      const res = await fetch(`/api/questions/${parentId}`);
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
      // API呼び出し（回答送信）
      const response = await fetch(`/api/questions/${formData.questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '回答の送信に失敗しました');
      }

      await response.json();

      // ドラフトをクリア
      localStorage.removeItem('answerDraft');

      // 完了画面へ遷移
      router.push(`/answers/${params.questionId}/complete`);
    } catch (error: unknown) {
      console.error('Error submitting answer:', error);
      const message = error instanceof Error ? error.message : '回答の送信に失敗しました。もう一度お試しください。';
      alert(message);
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!formData || !question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  const badgeClass = 'inline-flex items-center px-3 py-1 bg-primary/5 border border-primary/30 rounded-full text-sm font-semibold text-gray-800';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600" disabled={isSubmitting}>
            <Icon name="arrow_back" size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">回答記入確認</h1>
          <div className="w-6" />
        </div>
      </header>

      <main className="max-w-screen-sm mx-auto px-6 py-8 w-full">
        <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {/* 確認メッセージ（Q011 と同様のスタイル） */}
          <div className="bg-primary-ultralight border border-primary/30 rounded-lg p-4 text-sm text-gray-800">
            <div className="flex items-start gap-2">
              <span className="text-primary mt-0.5">
                <Icon name="info" size={18} />
              </span>
              <div>
                <span className="font-semibold">以下の内容で回答を送信します。内容をご確認ください。</span>
              </div>
            </div>
          </div>

          {/* 前の質問表示（追加質問の場合のみ） */}
          {question?.parentQuestionId && parentQuestion && (
            <div className="space-y-2 text-sm text-gray-700">
              <h2 className="text-sm font-semibold text-gray-900">前の質問</h2>
              <div className="flex flex-wrap gap-2">
                <span className={badgeClass}>{categoryNames[parentQuestion.categoryId] || parentQuestion.categoryId}</span>
                <span className={badgeClass}>{regionNames[parentQuestion.region] || parentQuestion.region}</span>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{parentQuestion.body}</p>
            </div>
          )}

          <hr className="border-gray-200" />

          {/* 質問内容（タイトル+本文を同枠で強調、カテゴリ/地域はバッジ） */}
          <div className="space-y-3">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 space-y-3">
              {question.title && (
                <h2 className="text-xl font-bold text-gray-900 whitespace-pre-wrap break-words">{question.title}</h2>
              )}
              <p className="text-base leading-relaxed whitespace-pre-wrap text-gray-800">{question.body}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(question.categories?.length ? question.categories : [question.categoryId]).map((cat) => (
                <span key={cat} className={badgeClass}>
                  {categoryNames[cat] || cat}
                </span>
              ))}
              <span className={badgeClass}>{regionNames[question.region] || question.region}</span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 回答選択肢 */}
          {formData.choice && formData.choice.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">回答選択肢</p>
              <div className="space-y-2">
                {formData.choice.map((choice, index) => {
                  const choiceIndex = question?.choices?.indexOf(choice) ?? -1;
                  const displayIndex = choiceIndex >= 0 ? choiceIndex : index;
                  return (
                    <div key={index} className="text-base flex items-center gap-2">
                      <span className="w-6 h-6 inline-flex items-center justify-center text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-gray-100">
                        {String.fromCharCode(65 + displayIndex)}
                      </span>
                      <span className="font-medium text-gray-900">{choice}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <hr className="border-gray-200" />

          {/* 回答 */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-900">回答</p>
            <p className="text-base whitespace-pre-wrap">{formData.text}</p>
            <div className="text-sm text-gray-500 text-right">{formData.text.length} 文字</div>
          </div>

          <hr className="border-gray-200" />

          {/* 場所情報 */}
          {formData.location && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">場所情報</p>
              <p className="text-base">{formData.location}</p>
            </div>
          )}

          {formData.location && <hr className="border-gray-200" />}

          {/* URL情報 */}
          {formData.url && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">URL情報</p>
              <a
                href={formData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-primary hover:underline break-all"
              >
                {formData.url}
              </a>
            </div>
          )}

          {formData.url && <hr className="border-gray-200" />}

          {/* 注意事項（Q020と同トーン） */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-gray-800">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 mt-0.5">
                <Icon name="warning_amber" size={18} />
              </span>
              <div className="space-y-1">
                <span className="font-semibold text-yellow-900">注意事項</span>
                <ul className="list-disc list-inside space-y-1 text-gray-800">
                  <li>医療行為や診断に該当する内容は記載しないでください</li>
                  <li>誹謗中傷や不適切な表現は控えてください</li>
                  <li>送信前にAIによる内容チェックが行われます</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-4">
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
              className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:bg-primary disabled:text-white disabled:opacity-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '送信中...' : '送信確定'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
