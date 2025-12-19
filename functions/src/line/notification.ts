import * as admin from 'firebase-admin';
import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
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

    // Only run if status is open (it should be on create)
    if (data.status === 'open') {
        logger.info(`New Question Created: ${questionId}. Running matching...`);
        await runMatchingForQuestion(questionId);
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

    // Update Question Status to 'answered' (?)
    // If it was 'open' or 'waiting_for_answer'.
    // User might manually close it, but usually 'answered' status is useful.
    if (qData.status !== 'closed') {
        await qDoc.ref.update({
            status: 'answered',
            answerCount: admin.firestore.FieldValue.increment(1)
        });
    }
});
