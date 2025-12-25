'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DEV_MOCK_USER, DEV_MOCK_TOKEN, DEV_DISPLAY_NAME } from '@/lib/auth-constants';

interface UseRequireAuthOptions {
  allowDev?: boolean;
}

/**
 * Blocks direct access when not authenticated (except in development).
 * Redirects to login with next param.
 */
export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { allowDev = true } = options;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 開発環境ではダミーユーザーを自動ログイン状態にする
    if (allowDev && process.env.NODE_ENV === 'development') {
      const devToken = localStorage.getItem('token');
      if (!devToken) localStorage.setItem('token', DEV_MOCK_TOKEN);
      if (!localStorage.getItem('userId')) localStorage.setItem('userId', DEV_MOCK_USER);
      if (!localStorage.getItem('displayName')) localStorage.setItem('displayName', DEV_DISPLAY_NAME);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      const next = encodeURIComponent(pathname || '/');
      router.replace(`/auth/login?next=${next}`);
    }
  }, [allowDev, pathname, router]);
}
