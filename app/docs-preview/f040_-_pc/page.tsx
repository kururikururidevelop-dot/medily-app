import Icon from '../../../components/Icon';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-screen-md mx-auto px-4 py-4 flex items-center gap-3">
          <Icon name="local_hospital" size={24} className="text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">退会画面プレビュー（PC）</h1>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto px-4 py-8 space-y-6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-2">このページはデザインプレビューです</h2>
          <p className="text-gray-700">
            実際の退会フローは /profile/withdraw をご確認ください。このプレビューはビルドを通すための簡易版です。
          </p>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-base font-semibold text-red-700 mb-3">注意事項</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>このページの操作は実際のデータには影響しません。</li>
            <li>UIイメージ確認のための静的コンテンツです。</li>
            <li>本番動作はアプリ内の退会ページをご利用ください。</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

