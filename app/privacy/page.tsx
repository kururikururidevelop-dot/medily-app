import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-screen-lg mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            Medily
          </Link>
        </div>
      </nav>

      <div className="max-w-screen-lg mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. 個人情報の収集</h2>
            <p className="text-gray-700 leading-relaxed">
              当サービスでは、ユーザー登録時に以下の個人情報を収集します。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
              <li>ニックネーム</li>
              <li>地域情報</li>
              <li>生まれ年（任意）</li>
              <li>性別（任意）</li>
              <li>メールアドレスまたはLINE連携情報</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. 個人情報の利用目的</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              収集した個人情報は、以下の目的で利用します。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>本サービスの提供・運営のため</li>
              <li>ユーザーからのお問い合わせに対応するため</li>
              <li>利用規約に違反したユーザーの特定・対応のため</li>
              <li>サービスの改善・新機能開発のため</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. 個人情報の第三者提供</h2>
            <p className="text-gray-700 leading-relaxed">
              当サービスは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. 個人情報の開示・訂正・削除</h2>
            <p className="text-gray-700 leading-relaxed">
              ユーザーは、自己の個人情報について、開示・訂正・削除を請求することができます。詳細は設定画面からご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Cookie等の利用</h2>
            <p className="text-gray-700 leading-relaxed">
              当サービスでは、利便性向上のためCookieを使用しています。Cookieの設定は、ブラウザの設定から変更可能です。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当サービスは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section className="pt-4 border-t">
            <p className="text-gray-600 text-sm">
              制定日: 2025年12月14日
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            ホームへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
