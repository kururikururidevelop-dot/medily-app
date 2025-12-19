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

const badgeClass =
  'inline-flex items-center px-3 py-1 bg-[#2DB596]/5 border border-[#2DB596]/30 rounded-full text-sm font-semibold text-gray-800';

export default function AnswerPage() {
  useRequireAuth();
  const router = useRouter();
  const params = useParams();
  const questionId = params?.questionId as string | undefined;

  const [question, setQuestion] = useState<Question | null>(null);
  const [parentQuestion, setParentQuestion] = useState<ParentQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<AnswerFormData>({
    questionId: questionId || '',
    choice: [],
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
        const fetched = data.question || data;
        setQuestion(fetched);
        setFormData((prev) => ({ ...prev, questionId: fetched.id }));

        // 親質問IDがあれば取得
        if (fetched.parentQuestionId) {
          fetchParentQuestion(fetched.parentQuestionId);
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
    if (!formData.text.trim()) {
      alert('回答を入力してください');
      return;
    }

    // 確認画面へ遷移（データをlocalStorageに一時保存）
    localStorage.setItem('answerDraft', JSON.stringify({ formData, question }));
    router.push(`/answers/${questionId}/confirm`);
  };

  const handleCancel = () => {
    if (confirm('入力内容は破棄されます。よろしいですか？')) {
      router.back();
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-[#2DB596] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!question) return null;

  const textLength = formData.text.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
            <Icon name="arrow_back" size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">回答を作成</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="max-w-screen-sm mx-auto px-6 py-8 w-full">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100 w-full">
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

          {/* 質問内容（タイトル+本文を同枠で強調、カテゴリ/地域はバッジ） */}
          <div className="space-y-3">
            <div className="rounded-xl border border-[#2DB596]/30 bg-[#2DB596]/5 p-5 space-y-3">
              {question.title && (
                <h2 className="text-xl font-bold text-gray-900 whitespace-pre-wrap break-words">{question.title}</h2>
              )}
              <p className="text-base leading-relaxed text-gray-900 whitespace-pre-wrap">{question.body}</p>
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

          {/* 回答選択肢 */}
          <div className="space-y-2">
            {question.choices && question.choices.length > 0 ? (
              <div className="space-y-2">
                {question.choices.filter((c) => c.trim()).map((choice, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.choice.includes(choice)
                      ? 'border-[#2DB596] bg-[#2DB596]/5'
                      : 'border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <input
                      type="checkbox"
                      value={choice}
                      checked={formData.choice.includes(choice)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, choice: [...formData.choice, choice] });
                        } else {
                          setFormData({ ...formData, choice: formData.choice.filter(c => c !== choice) });
                        }
                      }}
                      className="w-4 h-4 text-[#2DB596] focus:ring-[#2DB596] rounded"
                    />
                    <span className="w-6 h-6 inline-flex items-center justify-center text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-gray-100 ml-3 mr-2">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.choice.includes('yes')
                  ? 'border-[#2DB596] bg-[#2DB596]/5'
                  : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                  <input
                    type="checkbox"
                    value="yes"
                    checked={formData.choice.includes('yes')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, choice: [...formData.choice, 'yes'] });
                      } else {
                        setFormData({ ...formData, choice: formData.choice.filter(c => c !== 'yes') });
                      }
                    }}
                    className="w-4 h-4 text-[#2DB596] focus:ring-[#2DB596] rounded"
                  />
                  <span className="w-6 h-6 inline-flex items-center justify-center text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-gray-100 ml-3 mr-2">A</span>
                  <span>はい</span>
                </label>
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.choice.includes('no')
                  ? 'border-[#2DB596] bg-[#2DB596]/5'
                  : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                  <input
                    type="checkbox"
                    value="no"
                    checked={formData.choice.includes('no')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, choice: [...formData.choice, 'no'] });
                      } else {
                        setFormData({ ...formData, choice: formData.choice.filter(c => c !== 'no') });
                      }
                    }}
                    className="w-4 h-4 text-[#2DB596] focus:ring-[#2DB596] rounded"
                  />
                  <span className="w-6 h-6 inline-flex items-center justify-center text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-gray-100 ml-3 mr-2">B</span>
                  <span>いいえ</span>
                </label>
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.choice.includes('other')
                  ? 'border-[#2DB596] bg-[#2DB596]/5'
                  : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                  <input
                    type="checkbox"
                    value="other"
                    checked={formData.choice.includes('other')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, choice: [...formData.choice, 'other'] });
                      } else {
                        setFormData({ ...formData, choice: formData.choice.filter(c => c !== 'other') });
                      }
                    }}
                    className="w-4 h-4 text-[#2DB596] focus:ring-[#2DB596] rounded"
                  />
                  <span className="w-6 h-6 inline-flex items-center justify-center text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-gray-100 ml-3 mr-2">C</span>
                  <span>その他</span>
                </label>
              </div>
            )}
          </div>

          {/* 回答 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              回答 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full p-3 min-h-48 md:min-h-56 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2DB596] focus:border-transparent"
              placeholder="回答を入力してください"
              required
            />
            <div className="text-sm text-right text-gray-600">
              {textLength}文字
            </div>
          </div>

          {/* 場所情報 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">場所情報（任意）</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2DB596] focus:border-transparent"
              placeholder="例: 東京医科大学附属病院"
            />
          </div>

          {/* URL情報 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">URL情報（任意）</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2DB596] focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          {/* 注意事項（警告系：黄色トーン） */}
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
              className="flex-1 py-3 bg-[#2DB596] text-white rounded-lg font-medium hover:bg-[#26a383]"
            >
              回答確定
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
