'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';
import { DEV_MOCK_USER, DEV_MOCK_TOKEN, DEV_DISPLAY_NAME } from '@/lib/auth-constants';
export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get('next');
  const mode = searchParams.get('mode');
  const isLoginMode = mode === 'login';

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
        const token = data.token || DEV_MOCK_TOKEN;
        const userId = data.userId || data.user?.lineUserId || DEV_MOCK_USER;
        const displayName = data.displayName || data.user?.displayName || DEV_DISPLAY_NAME;

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">


      {/* メインコンテンツ */}
      <main className="max-w-screen-sm mx-auto px-6 py-8 w-full">
        {/* ロゴセクション */}
        {/* ヘッダー */}
        <div className="text-center mb-8">
          {/* ロゴ */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-sm border border-primary/10">
              <Icon name="medical_services" size={40} className="text-primary" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {isLoginMode ? 'おかえりなさい！' : 'LINE連携で始めよう'}
          </h1>
          {!isLoginMode ? (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Medilyを始めるために、アカウントを連携してください。
            </p>
          ) : (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              下のボタンからログインしてください。
            </p>
          )}
        </div>

        {/* ベネフィットリスト (新規登録時のみ表示) */}
        {!isLoginMode && (
          <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
            <ul className="space-y-5">
              {/* リスト項目1 */}
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Icon name="check" size={20} className="text-primary font-bold" />
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
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Icon name="notifications_active" size={20} className="text-primary font-bold" />
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
        )}

        {/* エラーメッセージ */}
        {error && (
          <div className="w-full mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* アクションエリア */}
        <div className="w-full flex flex-col items-center gap-4 mb-6">
          {/* LINEログインボタン */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full max-w-xs cursor-pointer flex items-center justify-center rounded-xl h-14 px-5 bg-[#06C755] hover:brightness-90 transition-all text-white gap-3 shadow-md relative group disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="underline hover:text-primary transition-colors"
          >
            利用規約
          </a>
          {' '}および{' '}
          <a
            href="/privacy"
            className="underline hover:text-primary transition-colors"
          >
            プライバシーポリシー
          </a>
          {' '}に同意したものとみなされます。
        </p>
      </footer>
    </div>
  );
}
