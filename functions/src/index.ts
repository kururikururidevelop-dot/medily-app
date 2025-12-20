/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


import * as admin from 'firebase-admin';

// LINE Webhook
export { lineWebhook } from './line/webhook';

admin.initializeApp();

// Notification Triggers
export { onQuestionCreated, onAnswerCreated } from './line/notification';

// Scheduled Functions
export { scheduledRematching, scheduledAutoClose } from './matching/scheduler';
