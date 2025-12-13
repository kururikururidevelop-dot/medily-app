'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (provider: 'line' | 'google') => {
    setLoading(true);
    setError(null);

    try {
      if (provider === 'line') {
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
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          router.push('/home');
        } else {
          // 本番: LINE OAuth へリダイレクト
          // TODO: LINE OAuth URLの実装
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/line`;
        }
      } else if (provider === 'google') {
        // Google ログイン処理
        // TODO: Google OAuth の実装
        setError('Google ログインは準備中です');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* ヘッダー */}
      <div className="pt-12 pb-8 text-center border-b border-gray-200">
        <div className="flex justify-center mb-4">
          <Icon name="logo" size={48} className="text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Medily</h1>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* タイトル */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            ログイン
          </h2>

          {/* 説明テキスト */}
          <p className="text-center text-gray-600 mb-8">
            アカウントにログインして、質問や回答を始めましょう
          </p>

          {/* エラーメッセージ */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* ボタングループ */}
          <div className="space-y-3">
            {/* LINE ログイン */}
            <button
              onClick={() => handleLogin('line')}
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon name="line" size={20} className="text-white" />
              LINE でログイン
            </button>

            {/* Google ログイン */}
            <button
              onClick={() => handleLogin('google')}
              disabled={loading}
              className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon name="google" size={20} />
              Google でログイン
            </button>
          </div>

          {/* 読み込み中表示 */}
          {loading && (
            <div className="mt-6 text-center">
              <div className="inline-block">
                <div className="animate-spin">
                  <Icon name="loading" size={24} className="text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">ログイン処理中...</p>
            </div>
          )}
        </div>
      </div>

      {/* フッター */}
      <div className="py-8 text-center text-xs text-gray-500 border-t border-gray-200">
        <p>© 2025 Medily. All rights reserved.</p>
      </div>
    </div>
  );
}
