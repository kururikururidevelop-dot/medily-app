import Link from 'next/link';
import Icon from '@/components/Icon';
import { Suspense } from 'react';

async function fetchPublicQuestions() {
  try {
    // Server Componentからの内部API呼び出しは絶対URLが必要
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:3000';
    const res = await fetch(`${baseUrl}/api/questions?public=true&status=open&limit=3`, {
      // Server Component fetchはデフォルトでキャッシュ。最新を表示したいのでno-store。
      cache: 'no-store'
    });
    const data = await res.json();
    return Array.isArray(data?.questions) ? data.questions : [];
  } catch (error) {
    console.error('Failed to fetch public questions:', error);
    return [];
  }
}

export default function Home() {
  const steps = [
    { num: 1, title: 'ログイン', desc: 'LINE またはメールでサインイン' },
    { num: 2, title: 'プロフィール登録', desc: '地域と関心領域を設定' },
    { num: 3, title: '質問投稿', desc: '医療に関する疑問を投稿' },
    { num: 4, title: '回答を受け取る', desc: '地域の専門家から回答' },
  ];

  const features = [
    {
      icon: 'lock',
      title: 'クローズドな安心感',
      desc: '相談内容は公開されず、マッチングした相手とだけの安心できる空間です。',
      color: 'text-primary',
    },
    {
      icon: 'favorite',
      title: '共感が癒しになる',
      desc: '「わかる」という一言が、孤独な闘病生活の大きな支えになります。',
      color: 'text-primary',
    },
    {
      icon: 'search',
      title: '病院選びの参考に',
      desc: '実際に通院した人のリアルな感想を聞いて、納得のいく病院選びを。',
      color: 'text-primary',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-ultralight to-white">
      {/* ナビゲーション */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-screen-lg mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Medily</h1>
          <Link
            href="/auth/login"
            className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary-ultralight transition"
          >
            ログイン
          </Link>
        </div>
      </nav>

      {/* ヒーロー */}
      <div className="max-w-screen-lg mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-6">
            <span className="text-xs font-medium">経験者同士の安心コミュニティ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            あなたの経験が、<br className="hidden md:block"/>だれかの<span className="text-primary relative">安心</span>に変わる。
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            同じ病気や怪我を経験した人だからこそ、話せることがあります。<br className="hidden sm:block"/>
            医療体験の「生の経験」を共有し、支え合う場所です。
          </p>
        </div>
        {/* HeroImage: サービスイメージ（将来的に画像を配置） */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl h-64 bg-gradient-to-br from-primary-ultralight to-white rounded-2xl flex items-center justify-center border-2 border-primary/20">
            <div className="text-center">
              <Icon name="local_hospital" size={64} className="text-primary mb-2" />
              <p className="text-gray-500 text-sm">医療相談のイメージ</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/login"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white text-lg font-bold rounded-lg hover:from-primary-light hover:to-primary-dark transition shadow-lg"
            >
              質問してみる
            </Link>
            <Link
              href="/questions"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white text-lg font-bold rounded-lg hover:from-primary-light hover:to-primary-dark transition shadow-lg"
            >
              回答してみる
            </Link>
          </div>
        </div>
      </div>

      {/* 特徴 */}
      <div className="max-w-screen-lg mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">専門家ではない、「経験者」に相談する</h3>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Medilyの回答者は医療従事者ではなく、あなたと同じ経験を持つ一般の方々です。専門的な診断ではなく、生活の工夫や気持ちの持ち方など、経験者ならではの「生の声」を聞くことができます。
          </p>
        </div>

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

      {/* 質問事例（公開） */}
      <div className="max-w-screen-lg mx-auto px-4 py-16 bg-white">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">こんな質問が届いています</h3>
        <p className="text-center text-gray-600 text-sm mb-12">あなたの経験が必要です。回答者として参加してみませんか？</p>
        <Suspense fallback={<div className="text-center text-gray-600">読み込み中...</div>}>
          {/* Server Component内でfetchして静的カードをレンダリング */}
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <QuestionExamples />
        </Suspense>
      </div>

      {/* 使用方法 */}
      <div className="max-w-screen-lg mx-auto px-4 py-16 bg-white">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">使い方</h3>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {steps.map((step) => (
            <div key={step.num} className="p-4">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-primary text-white text-2xl font-bold rounded-full">
                {step.num}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="max-w-screen-lg mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">医療の質問を、今すぐ解決しましょう</h3>
          <p className="text-lg mb-8 opacity-90">無料で登録・利用できます。</p>
          <Link
            href="/auth/login"
            className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition"
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

async function QuestionExamples() {
  const questions = await fetchPublicQuestions();
  if (!questions.length) {
    return (
      <div className="text-center text-gray-600">公開質問の例は現在ありません。</div>
    );
  }
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {questions.map((q: any) => (
        <div key={q.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="text-sm text-gray-500 mb-2">{q.region}・{q.category}</div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">{q.title ?? '質問'}</h4>
          <p className="text-gray-700 text-sm line-clamp-3 mb-4">{q.content ?? q.body}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>回答数: {q.answerCount ?? 0}</span>
            <Link href="/questions" className="text-primary hover:underline">詳細を見る</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

