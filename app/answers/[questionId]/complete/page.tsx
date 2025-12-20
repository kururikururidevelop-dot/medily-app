'use client';

import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function AnswerCompletePage() {
  const router = useRouter();

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center">回答送信完了</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          {/* 完了アイコン */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Icon name="check" size={48} className="text-white" />
            </div>
          </div>

          {/* 完了メッセージ */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            回答を送信しました
          </h2>

          <p className="text-gray-600 mb-2">
            回答が正常に送信されました。
          </p>
          <p className="text-gray-600 mb-8">
            質問者にLINEで通知が配信されます。
          </p>

          {/* 説明テキスト */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-medium text-blue-900 mb-4 flex items-center">
              <Icon name="info" size={20} className="mr-2" />
              お知らせ
            </h3>
            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside ml-4">
              <li>あなたの回答が質問者の助けになりました</li>
              <li>回答履歴は「マイページ」から確認できます</li>
              <li>貢献度が加算され、ツリーが成長します</li>
            </ul>
          </div>

          {/* ボタン */}
          <button
            onClick={handleGoToProfile}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark"
          >
            マイページに移動
          </button>
        </div>
      </main>
    </div>
  );
}
