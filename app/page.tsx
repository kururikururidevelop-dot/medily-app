import Link from 'next/link';
import Icon from '@/components/Icon';

export default function Home() {
  const steps = [
    { num: 1, title: 'ログイン', desc: 'LINE またはメールでサインイン' },
    { num: 2, title: 'プロフィール登録', desc: '地域と関心領域を設定' },
    { num: 3, title: '質問投稿', desc: '医療に関する疑問を投稿' },
    { num: 4, title: '回答を受け取る', desc: '地域の専門家から回答' },
  ];

  const features = [
    {
      icon: 'local_hospital',
      title: '信頼できるアドバイス',
      desc: '医療・看護・薬学の専門家から的確な助言を受けられます。',
      color: 'text-blue-600',
    },
    {
      icon: 'public',
      title: '地域別マッチング',
      desc: 'お住まいの地域に詳しい回答者とマッチングします。',
      color: 'text-green-600',
    },
    {
      icon: 'shield',
      title: 'プライバシー保護',
      desc: '個人情報を開示せずに安心して相談できます。',
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ナビゲーション */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Medily</h1>
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ログイン
          </Link>
        </div>
      </nav>

      {/* ヒーロー */}
      <div className="max-w-screen-lg mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          医療の質問に、地域のエキスパートが答えます
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Medily は、医療に関する疑問を地域の医療従事者につなぎ、信頼できる情報をお届けする Q&A プラットフォームです。
        </p>
        <Link
          href="/auth/login"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
        >
          今すぐ始める
        </Link>
      </div>

      {/* 特徴 */}
      <div className="max-w-screen-lg mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Medily の特徴</h3>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">
                <Icon name={feature.icon} size={48} className={feature.color} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 使用方法 */}
      <div className="max-w-screen-lg mx-auto px-4 py-16 bg-white">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">使い方</h3>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {steps.map((step) => (
            <div key={step.num} className="p-4">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full">
                {step.num}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
        <div className="max-w-screen-lg mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">医療の質問を、今すぐ解決しましょう</h3>
          <p className="text-lg mb-8 opacity-90">無料で登録・利用できます。</p>
          <Link
            href="/auth/login"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            ログインして始める
          </Link>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Medily</h4>
              <p className="text-sm leading-relaxed">
                医療に関する質問と回答のためのコミュニティプラットフォーム。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">リンク</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">ホーム</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition">ログイン</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">ポリシー</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">プライバシー</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">お問い合わせ</h4>
              <p className="text-sm">support@medily.jp</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2025 Medily. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

