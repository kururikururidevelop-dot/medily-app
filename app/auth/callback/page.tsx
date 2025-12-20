'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Icon from '@/components/Icon';

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('Authenicating...');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = searchParams.get('token');
        const isNew = searchParams.get('isNew') === 'true';
        const next = searchParams.get('next');

        if (!token) {
            setError('認証トークンが見つかりません。');
            setStatus('Error');
            return;
        }

        if (!auth) {
            setError('Firebase Auth initialization failed.');
            setStatus('Error');
            return;
        }

        const doLogin = async () => {
            try {
                const userCredential = await signInWithCustomToken(auth, token);
                const user = userCredential.user;

                // Store userId for ProfileRegisterPage usage
                localStorage.setItem('userId', user.uid);
                if (user.displayName) {
                    localStorage.setItem('displayName', user.displayName);
                }

                setStatus('Login successful! Redirecting...');

                // Wait a bit or redirect immediately
                if (isNew) {
                    // New User -> Profile Registration
                    // We might want to pass 'next' to profile registration too so they go there after registration?
                    router.replace('/profile/register');
                } else {
                    // Existing User -> 'next' or Home
                    if (next && next.startsWith('/') && !next.startsWith('//')) {
                        router.replace(next);
                    } else {
                        router.replace('/home');
                    }
                }
            } catch (e: any) {
                console.error('Login Error:', e);
                setError('ログイン処理に失敗しました: ' + e.message);
                setStatus('Error');
            }
        };

        doLogin();
    }, [router, searchParams]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-red-50 p-4">
                <Icon name="error" size={48} className="text-red-500" />
                <p className="text-red-700 text-lg font-bold">{error}</p>
                <button onClick={() => router.replace('/auth/login')} className="underline">ログイン画面へ戻る</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-gray-50">
            <div className="animate-spin text-primary">
                <Icon name="autorenew" size={48} />
            </div>
            <p className="text-gray-600 font-medium">{status}</p>
        </div>
    );
}
