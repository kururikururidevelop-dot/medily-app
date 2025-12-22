// lib/firebase.ts
// Firebase 初期化と Firestore、Auth インスタンス

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const isServer = typeof window === 'undefined';
const isConfigured = Object.values(firebaseConfig).every(Boolean);

if (!isConfigured) {
  console.warn('[Firebase] Configuration incomplete. Missing environment variables:', {
    hasApiKey: !!firebaseConfig.apiKey,
    hasAuthDomain: !!firebaseConfig.authDomain,
    hasProjectId: !!firebaseConfig.projectId,
    hasStorageBucket: !!firebaseConfig.storageBucket,
    hasMessagingSenderId: !!firebaseConfig.messagingSenderId,
    hasAppId: !!firebaseConfig.appId,
  });
}

console.log(`[Firebase] Initializing... IsServer=${isServer}, Env=${process.env.NODE_ENV}, AppEnv=${process.env.NEXT_PUBLIC_APP_ENV}`);

const app = isConfigured
  ? getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0]
  : null;

export const db = isConfigured && app ? getFirestore(app) : null;
export const auth = isConfigured && app ? getAuth(app) : null;

// Connect to emulators in development (if running Firebase emulator suite)
if (
  isConfigured &&
  app &&
  db &&
  auth &&
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_APP_ENV === 'emulator'
) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
    console.log(`[Firebase] Connected to emulators (Firestore: 8080, Auth: 9099) [IsServer=${isServer}]`);
  } catch (error) {
    // Emulator already connected, only log if it's a different error
    if (error instanceof Error && !error.message.includes('already')) {
      console.error('[Firebase] Emulator connection error:', error);
    } else {
      console.log(`[Firebase] Emulator already connected [IsServer=${isServer}]`);
    }
  }
}

export default app;
