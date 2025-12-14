'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
    if (allowDev && process.env.NODE_ENV === 'development') return;
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    if (!token) {
      const next = encodeURIComponent(pathname || '/');
      router.replace(`/auth/login?next=${next}`);
    }
  }, [allowDev, pathname, router]);
}
