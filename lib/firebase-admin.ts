import { initializeApp, getApps, cert, getApp, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Prevent multiple initializations in development
let app: App;

if (getApps().length === 0) {
    const options: any = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };

    // If using a service account (e.g. locally or non-GCP environment), load it here.
    // For Cloud Run / Functions, default credentials (no args) usually work if IAM is set up.
    // In verified environment (like Vercel), we might need GOOGLE_APPLICATION_CREDENTIALS or similar.
    // For now, using default credentials + projectId.

    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            options.credential = cert(serviceAccount);
        } catch (e) {
            console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY', e);
        }
    }

    app = initializeApp(options);
} else {
    app = getApp();
}

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
