import * as admin from 'firebase-admin';
import * as logger from "firebase-functions/logger";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { runMatchingForQuestion } from './engine';

if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();

// 1. Re-matching Scheduler (e.g., every 3 hours)
// User requirement: "If status is waiting_for_answer and 3 hours passed -> Re-match"
export const scheduledRematching = onSchedule("every 3 hours", async (event) => {
    logger.info("Starting scheduled re-matching...");

    const now = admin.firestore.Timestamp.now();
    const threeHoursAgo = new Date(now.toMillis() - 3 * 60 * 60 * 1000);

    // Find questions waiting for answer for > 3 hours
    // (And maybe limit to those not updated recently?)
    // Ensuring we don't spam: matching engine filters out already notified users.

    const snapshot = await db.collection('questions')
        .where('status', '==', 'waiting_for_answer')
        // .where('lastMatchedAt', '<=', threeHoursAgo) // Optional optimization
        .get();

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const lastMatched = data.lastMatchedAt?.toDate() || data.createdAt.toDate();

        if (lastMatched <= threeHoursAgo) {
            await runMatchingForQuestion(doc.id, true);
        }
    }
});


