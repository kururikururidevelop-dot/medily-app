
import {
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    getCountFromServer,
    collectionGroup
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface UserProfile {
    id: string; // Document ID is userId
    displayName: string;
    region: string;
    primaryCategory?: string; // old field
    categories: string[];
    medicalBackground?: string;
    avatar?: string;
    pictureUrl?: string; // LINE profile image
    notificationConsent?: boolean;
    profileCompletedAt?: any;
    updatedAt?: any;
    gender?: string;
    birthYear?: string;
}

export interface UserSummary {
    questions: number;
    answeredQuestions: number;
    answers: number;
}

export const userService = {
    async getUserProfile(userId: string): Promise<UserProfile | null> {
        if (!db) throw new Error('Firebase is not configured');

        const userRef = doc(db, 'users', userId);
        const snap = await getDoc(userRef);

        if (!snap.exists()) return null;

        const data = snap.data();
        return {
            id: snap.id,
            displayName: data.displayName,
            region: data.region,
            primaryCategory: data.primaryCategory,
            categories: data.categories || [],
            medicalBackground: data.medicalBackground,
            avatar: data.avatar,
            pictureUrl: data.pictureUrl,
            notificationConsent: data.notificationConsent,
            gender: data.gender,
            birthYear: data.birthYear,
            profileCompletedAt: data.profileCompletedAt, // Keep raw or format? Keeping raw for now
            updatedAt: data.updatedAt
        };
    },

    async updateUserProfile(userId: string, data: Partial<UserProfile>) {
        if (!db) throw new Error('Firebase is not configured');

        const userRef = doc(db, 'users', userId);

        const updateData: any = {
            ...data,
            updatedAt: new Date()
        };

        // Logic for backwards compatibility (category/categories)
        if (data.categories && data.categories.length > 0) {
            updateData.primaryCategory = data.categories[0];
        }

        await setDoc(userRef, updateData, { merge: true });
    },

    async getUserSummary(userId: string): Promise<UserSummary> {
        if (!db) throw new Error('Firebase is not configured');

        const questionsRef = collection(db, 'questions');

        // My questions
        const qAll = query(questionsRef, where('userId', '==', userId));
        // My answered questions (questions I asked that have status 'answered') (?)
        // Original API logic: where('userId', '==', userId), where('status', '==', 'answered')
        // This implies "Questions I asked that got answered".
        const qAnswered = query(questionsRef, where('userId', '==', userId), where('status', '==', 'answered'));

        // Answers I gave (across all questions)
        const answersGroup = collectionGroup(db, 'answers');
        const answersByMe = query(answersGroup, where('userId', '==', userId));

        const [allQuestionsSnap, answeredQuestionsSnap, answersSnap] = await Promise.all([
            getCountFromServer(qAll),
            getCountFromServer(qAnswered),
            getCountFromServer(answersByMe),
        ]);

        return {
            questions: allQuestionsSnap.data().count,
            answeredQuestions: answeredQuestionsSnap.data().count,
            answers: answersSnap.data().count,
        };
    }
};
