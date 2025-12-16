'use client';

import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function QuestionCompletePage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center">質問投稿完了</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          {/* 完了アイコン */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#2DB596] rounded-full flex items-center justify-center">
              <Icon name="check" size={48} className="text-white" />
            </div>
          </div>

          {/* 完了メッセージ */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            質問を投稿しました！
          </h2>

          <p className="text-gray-600 mb-2">
            質問が正常に投稿されました。
          </p>
          <p className="text-gray-600 mb-8">
            マッチングした回答者にLINEで通知が配信されます。
          </p>

          {/* 説明テキスト */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-medium text-blue-900 mb-4 flex items-center">
              <Icon name="info" size={20} className="mr-2" />
              次のステップ
            </h3>
            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside ml-4">
              <li>回答者から回答が届くと、LINEで通知されます</li>
              <li>質問と回答は「ホーム」の「質問」タブから確認できます</li>
              <li>一定時間が経っても回答がない場合は、LINEで通知されます</li>
            </ul>
          </div>

          {/* ボタン */}
          <button
            onClick={handleGoHome}
            className="w-full py-3 bg-[#2DB596] text-white rounded-lg font-medium hover:bg-[#26a383]"
          >
            ホームに戻る
          </button>
        </div>
      </main>
    </div>
  );
}
