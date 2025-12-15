'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import Icon from '@/components/Icon';

interface Question {
  id: string;
  body: string;
  categoryId: string;
  region: string;
  choices: string[];
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

export default function AnswerPage() {
  useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = searchParams.get('questionId');

  const [question, setQuestion] = useState<Question | null>(null);
  const [parentQuestion, setParentQuestion] = useState<ParentQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<AnswerFormData>({
    questionId: questionId || '',
    choice: '',
    location: '',
    url: '',
    text: '',
  });

  useEffect(() => {
    if (!questionId) {
      alert('質問IDが指定されていません');
      router.push('/home');
      return;
    }

    // 質問データを取得
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        if (!response.ok) {
          throw new Error('質問の取得に失敗しました');
        }
        const data = await response.json();
        setQuestion(data);
        setFormData(prev => ({ ...prev, questionId: data.id }));
        
        // 親質問IDがあれば取得
        if (data.parentQuestionId) {
          fetchParentQuestion(data.parentQuestionId);
        }
      } catch (error) {
        console.error('Error fetching question:', error);
        alert('質問の取得に失敗しました');
        router.push('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId, router]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!formData.choice) {
      alert('回答選択肢を選択してください');
      return;
    }
    if (!formData.text.trim()) {
      alert('回答コメントを入力してください');
      return;
    }
    if (formData.text.length < 100 || formData.text.length > 140) {
      alert('回答コメントは100文字以上140文字以下で入力してください');
      return;
    }

    // 確認画面へ遷移（データをlocalStorageに一時保存）
    localStorage.setItem('answerDraft', JSON.stringify({ formData, question }));
    router.push(`/answers/${questionId}/confirm`);
  };

  const handleCancel = () => {
    if (confirm('入力内容は破棄されます。よろしいですか？')) {
      router.push('/home');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">質問が見つかりませんでした</div>
      </div>
    );
  }

  const textLength = formData.text.length;
  const isTextValid = textLength >= 100 && textLength <= 140;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={handleCancel} className="text-gray-600">
            <Icon name="arrow_back" size={24} />
          </button>
          <h1 className="text-xl font-bold">回答記入</h1>
          <div className="w-6" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* 前の質問表示（追加質問の場合のみ） */}
        {question?.parentQuestionId && parentQuestion && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-blue-900 mb-3">前の質問</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex gap-2">
                <span className="inline-block px-2 py-1 bg-white rounded text-xs font-medium">
                  {categoryNames[parentQuestion.categoryId] || parentQuestion.categoryId}
                </span>
                <span className="inline-block px-2 py-1 bg-white rounded text-xs font-medium">
                  {regionNames[parentQuestion.region] || parentQuestion.region}
                </span>
              </div>
              <p className="text-gray-800 mt-3">{parentQuestion.body}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 質問内容（読み取り専用） */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg shadow p-6">
            <h2 className="text-sm font-medium text-blue-900 mb-4 flex items-center">
              <Icon name="question_answer" size={20} className="mr-2" />
              質問内容
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-blue-700">カテゴリ: </span>
                <span className="text-sm font-medium text-blue-900">
                  {categoryNames[question.categoryId] || question.categoryId}
                </span>
              </div>
              <div>
                <span className="text-xs text-blue-700">地域: </span>
                <span className="text-sm font-medium text-blue-900">
                  {regionNames[question.region] || question.region}
                </span>
              </div>
              <div className="pt-2 border-t border-blue-200">
                <p className="text-base text-gray-900 whitespace-pre-wrap">{question.body}</p>
              </div>
            </div>
          </div>

          {/* 回答選択肢 */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              回答選択肢 <span className="text-red-500">*</span>
            </label>
            {question.choices && question.choices.length > 0 ? (
              <div className="space-y-2">
                {question.choices.filter(c => c.trim()).map((choice, index) => (
                  <label key={index} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="choice"
                      value={choice}
                      checked={formData.choice === choice}
                      onChange={(e) => setFormData({ ...formData, choice: e.target.value })}
                      className="mr-3"
                      required
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            ) : (
              <select
                value={formData.choice}
                onChange={(e) => setFormData({ ...formData, choice: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2DB596] focus:border-transparent"
                required
              >
                <option value="">選択してください</option>
                <option value="yes">はい</option>
                <option value="no">いいえ</option>
                <option value="other">その他</option>
              </select>
            )}
          </div>

          {/* 場所情報 */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              場所情報（任意）
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2DB596] focus:border-transparent"
              placeholder="例: 東京医科大学附属病院"
            />
          </div>

          {/* URL情報 */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              URL情報（任意）
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#2DB596] focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          {/* 回答コメント */}
          <div className="bg-white rounded-lg shadow p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              回答コメント <span className="text-red-500">*</span>
              <span className="ml-2 text-xs text-gray-500">
                （100文字以上140文字以下）
              </span>
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className={`w-full border rounded-lg p-3 min-h-32 focus:ring-2 focus:border-transparent ${
                textLength > 0 && !isTextValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#2DB596]'
              }`}
              placeholder="回答コメントを入力してください（100文字以上140文字以下）"
              required
            />
            <div className="mt-2 text-sm text-right">
              <span className={textLength > 0 && !isTextValid ? 'text-red-600 font-medium' : 'text-gray-600'}>
                {textLength} / 140文字
              </span>
              {textLength > 0 && textLength < 100 && (
                <span className="ml-2 text-red-600">（あと{100 - textLength}文字必要です）</span>
              )}
            </div>
          </div>

          {/* 注意事項 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2 flex items-center">
              <Icon name="warning" size={20} className="mr-2" />
              注意事項
            </h3>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>医療行為や診断に該当する内容は記載しないでください</li>
              <li>誹謗中傷や不適切な表現は控えてください</li>
              <li>送信前にAIによる内容チェックが行われます</li>
            </ul>
          </div>

          {/* ボタン */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#2DB596] text-white rounded-lg font-medium hover:bg-[#26a383] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isTextValid || !formData.choice}
            >
              確認
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
