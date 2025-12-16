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
  region: string;
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
  choice: string;
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

      const result = await response.json();
      
      // ドラフトをクリア
      localStorage.removeItem('answerDraft');
      
      // 完了画面へ遷移
      router.push(`/answers/${params.questionId}/complete`);
    } catch (error: any) {
      console.error('Error submitting answer:', error);
      alert(error.message || '回答の送信に失敗しました。もう一度お試しください。');
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

  const badgeClass = 'inline-flex items-center px-3 py-1 bg-[#2DB596]/5 border border-[#2DB596]/30 rounded-full text-sm font-semibold text-gray-800';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600" disabled={isSubmitting}>
            <Icon name="arrow_back" size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">回答記入確認</h1>
          <div className="w-6" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 確認メッセージ（Q011 と同様のスタイル） */}
          <div className="bg-[#E9FBF6] border border-[#2DB596]/30 rounded-lg p-4 text-sm text-gray-800">
            <div className="flex items-start gap-2">
              <span className="text-[#2DB596] mt-0.5">
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
            <div className="rounded-xl border border-[#2DB596]/30 bg-[#2DB596]/5 p-5 space-y-3">
              {question.title && (
                <h2 className="text-xl font-bold text-gray-900 whitespace-pre-wrap break-words">{question.title}</h2>
              )}
              <p className="text-base leading-relaxed whitespace-pre-wrap text-gray-800">{question.body}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={badgeClass}>{categoryNames[question.categoryId] || question.categoryId}</span>
              <span className={badgeClass}>{regionNames[question.region] || question.region}</span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* 回答選択肢 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-sm font-medium text-gray-500 mb-2">回答選択肢</h2>
            <p className="text-base font-medium text-gray-900">{formData.choice}</p>
          </div>

          <hr className="border-gray-200" />

          {/* 場所情報 */}
          {formData.location && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">場所情報</h2>
              <p className="text-base">{formData.location}</p>
            </div>
          )}

          {formData.location && <hr className="border-gray-200" />}

          {/* URL情報 */}
          {formData.url && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">URL情報</h2>
              <a 
                href={formData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-base text-[#2DB596] hover:underline break-all"
              >
                {formData.url}
              </a>
            </div>
          )}

          {formData.url && <hr className="border-gray-200" />}

          {/* 回答コメント */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-sm font-medium text-gray-500 mb-2">回答コメント</h2>
            <p className="text-base whitespace-pre-wrap">{formData.text}</p>
            <div className="mt-2 text-sm text-gray-500 text-right">
              {formData.text.length} 文字
            </div>
          </div>

          {/* 注意事項 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2 flex items-center">
              <Icon name="info" size={20} className="mr-2" />
              送信について
            </h3>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>送信前にAIによる内容チェックが行われます</li>
              <li>不適切な内容が検出された場合、送信できない場合があります</li>
              <li>送信後、質問者にLINEで通知が配信されます</li>
            </ul>
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
              className="flex-1 py-3 bg-[#2DB596] text-white rounded-lg font-medium hover:bg-[#26a383] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '送信中...' : '送信確定'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
