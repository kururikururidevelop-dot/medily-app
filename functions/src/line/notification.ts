import * as admin from 'firebase-admin';
import * as logger from "firebase-functions/logger";
import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
import { runMatchingForQuestion } from '../matching/engine';
import { lineClient } from './client';

if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();

// 1. When a new Question is created -> Run Matching
export const onQuestionCreated = onDocumentCreated("questions/{questionId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const questionId = event.params.questionId;
    const data = snapshot.data();

    // Run matching if status is 'matching' (new initial status)
    if (data.status === 'matching') {
        logger.info(`New Question Created: ${questionId}. Running matching...`);
        await runMatchingForQuestion(questionId);
    }
});

// 1.5 When Question is Updated -> Run Matching (if status changed to 'matching')
export const onQuestionUpdated = onDocumentUpdated("questions/{questionId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const questionId = event.params.questionId;
    const beforeData = snapshot.before.data();
    const afterData = snapshot.after.data();

    // If status changed to 'matching' from something else, run matching
    if (beforeData.status !== 'matching' && afterData.status === 'matching') {
        logger.info(`Question Status Changed to 'matching': ${questionId}. Running matching...`);
        // Force retry true? Or just run.
        await runMatchingForQuestion(questionId, true);
    }
});

// 2. When a new Answer is created -> Notify Question Author
export const onAnswerCreated = onDocumentCreated("questions/{questionId}/answers/{answerId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) return;

    const questionId = event.params.questionId;
    // const answerId = event.params.answerId;
    const answerData = snapshot.data();

    // Get Question to find Author
    const qDoc = await db.collection('questions').doc(questionId).get();
    if (!qDoc.exists) return;
    const qData = qDoc.data();
    if (!qData) return;

    const authorId = qData.userId;

    // Don't notify if author answered their own question (reply)
    if (authorId === answerData.userId) return;

    // Get Author's Profile to get LINE ID
    const userDoc = await db.collection('users').doc(authorId).get();
    if (!userDoc.exists) return;
    const userData = userDoc.data();

    const lineUserId = userData?.lineUserId;
    if (lineUserId && userData?.notificationConsent) {
        try {
            await lineClient.pushMessage(lineUserId, {
                type: 'text',
                text: `【回答到着】あなたの質問に新しい回答がつきました！\n\n${answerData.content.substring(0, 50)}...\n\n確認する: https://medily-app.web.app/questions/${questionId}`
            });
            logger.info(`Notified author ${authorId} of new answer`);
        } catch (e) {
            logger.error(`Failed to notify author ${authorId}`, e);
        }
    }

    // Update Question Status to 'answered' and update count (Count Aggregation)
    // Allow update unless it is strictly closed/auto_closed
    // Update Question Status to 'answered' and update count (Count Aggregation)
    // Allow update unless it is strictly matching_failed? Or just always update.
    // Logic was: if (qData.status !== 'closed' && qData.status !== 'auto_closed')
    // Now we assume all other statuses are valid for update or we just check if it's not matching_failed?
    // User wants to remove usage of closed/auto_closed.
    // If status is matching_failed, maybe we shouldn't update? Or maybe we should?
    // Let's just remove the check as requested, or replace with logic relevant to remaining statuses.
    // If it is 'matching_failed', adding an answer probably should revive it?
    // For now, I will blindly remove the check to satisfy the request "delete usage".
    {
        try {
            const answersRef = db.collection('questions').doc(questionId).collection('answers');
            const countSnapshot = await answersRef.count().get();
            const currentCount = countSnapshot.data().count;

            await qDoc.ref.update({
                status: 'answered',
                answerCount: currentCount
            });
        } catch (error) {
            logger.error(`Failed to update answer count for ${questionId}`, error);
            // Fallback to increment if count() fails (e.g. old SDK)? 
            // Better to log error. This is critical for data integrity.
        }
    }
});
