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

// 2. Auto-close Scheduler (e.g., every 1 hour check)
// User requirement: "Status 'answered' AND 48h passed AND no new interaction -> Auto close"
export const scheduledAutoClose = onSchedule("every 1 hours", async (event) => {
    logger.info("Starting scheduled auto-close check...");

    const now = admin.firestore.Timestamp.now();
    const fortyEightHoursAgo = new Date(now.toMillis() - 48 * 60 * 60 * 1000);

    const snapshot = await db.collection('questions')
        .where('status', '==', 'answered')
        .get();

    const batch = db.batch();
    let count = 0;

    for (const doc of snapshot.docs) {
        const data = doc.data();
        // Check updatedAt (which updates on new answer/reply)
        const lastUpdate = data.updatedAt?.toDate() || data.createdAt.toDate();

        if (lastUpdate <= fortyEightHoursAgo) {
            batch.update(doc.ref, { status: 'auto_closed' });
            // TODO: Notify contributors & update contribution score
            count++;
        }
    }

    if (count > 0) {
        await batch.commit();
        logger.info(`Auto-closed ${count} questions.`);
    }
});
