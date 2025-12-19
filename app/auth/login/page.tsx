'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';
export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get('next');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // 開発環境: モックログイン
      if (process.env.NODE_ENV === 'development') {
        const response = await fetch('/api/auth/mock-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: 'line' }),
        });

        if (!response.ok) {
          throw new Error('ログインに失敗しました');
        }

        const data = await response.json();
        const token = data.token || 'dev-mock-token';
        const userId = data.userId || data.user?.lineUserId || 'dev-mock-user';
        const displayName = data.displayName || data.user?.displayName || 'デモユーザー';

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('displayName', displayName);

        // 元の画面へリダイレクト（デフォルトはホーム）
        const redirectUrl = next ? decodeURIComponent(next) : '/home';
        router.push(redirectUrl);
      } else {
        // 本番: LINE OAuth へリダイレクト
        // nextパラメータをcallbackとして渡す（APIの仕様によるが、一般的なパラメータ名で付与）
        const callbackUrl = next ? `?callback=${encodeURIComponent(next)}` : '';
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/line${callbackUrl}`;
      }
    } catch (err) {
      console.error('[Login] Authentication failed:', err);
      setError(err instanceof Error ? err.message : 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // TODO: 未ログイン状態でアクセス可能な画面へ遷移（例：PRサイト）
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      {/* トップバー */}
      <div className="flex items-center bg-gray-50 dark:bg-gray-900 p-4 pb-2 justify-between sticky top-0 z-10">
        <button
          onClick={handleSkip}
          className="text-gray-900 dark:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="閉じる"
        >
          <Icon name="close" size={24} />
        </button>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          アカウント連携
        </h2>
      </div>

      {/* メインコンテンツ */}
      <main className="flex flex-col items-center pt-8 px-6 w-full max-w-md mx-auto">
        {/* ロゴセクション */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2DB596]/20 to-[#2DB596]/5 flex items-center justify-center mb-4 shadow-sm border border-[#2DB596]/10">
            <Icon name="medical_services" size={48} className="text-[#2DB596]" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white tracking-tight">
            Medily
          </h1>
        </div>

        {/* ヘッドライン */}
        <h2 className="text-gray-900 dark:text-white tracking-tight text-[24px] font-bold leading-tight text-center mb-6">
          LINE連携で始めよう
        </h2>

        {/* ベネフィットリスト */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
          <ul className="space-y-5">
            {/* リスト項目1 */}
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2DB596]/10 flex items-center justify-center mt-0.5">
                <Icon name="check" size={20} className="text-[#2DB596] font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-base">
                  ワンタップでログイン
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  IDやパスワード入力の手間がありません
                </span>
              </div>
            </li>

            {/* リスト項目2 */}
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2DB596]/10 flex items-center justify-center mt-0.5">
                <Icon name="notifications_active" size={20} className="text-[#2DB596] font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-base">
                  リアルタイムな回答をすぐに通知
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  欲しい回答を見逃さず確認できます
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="w-full mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* アクションエリア */}
        <div className="w-full flex flex-col gap-4 mb-6">
          {/* LINEログインボタン */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full cursor-pointer flex items-center justify-center rounded-xl h-14 px-5 bg-[#06C755] hover:brightness-90 transition-all text-white gap-3 shadow-md relative group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin">
                  <Icon name="autorenew" size={24} className="text-white" />
                </div>
                <span className="text-lg font-bold tracking-wide">ログイン処理中...</span>
              </div>
            ) : (
              <>
                {/* LINE公式アイコン（画像） */}
                <img
                  src="/icons/line-logo-white@2x.png"
                  srcSet="/icons/line-logo-white@2x.png 2x, /icons/line-logo-white@3x.png 3x"
                  alt="LINE"
                  className="absolute left-5 w-[40px] h-[40px]"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <span className="text-lg font-bold tracking-wide">LINEでログイン</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* フッター */}
      <footer className="p-6 bg-gray-50 dark:bg-gray-900">
        <p className="text-xs text-center text-gray-400 dark:text-gray-500 leading-relaxed">
          ログインすることで、
          <a
            href="/terms"
            className="underline hover:text-[#2DB596] transition-colors"
          >
            利用規約
          </a>
          {' '}および{' '}
          <a
            href="/privacy"
            className="underline hover:text-[#2DB596] transition-colors"
          >
            プライバシーポリシー
          </a>
          {' '}に同意したものとみなされます。
        </p>
      </footer>
    </div>
  );
}
