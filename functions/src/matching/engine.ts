import * as admin from 'firebase-admin';
import * as logger from "firebase-functions/logger";
import { lineClient } from '../line/client';

if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();

interface UserProfile {
    id: string;
    displayName: string;
    region: string;
    categories?: string[];
    birthYear?: string;
    lineUserId?: string;
    notificationConsent?: boolean;
}

interface Question {
    id: string;
    userId: string;
    title: string;
    region: string;
    category: string;
    categoryIds?: string[]; // Assuming array for multiple categories support
    tags?: string[];
    ageGroups?: string[]; // e.g. ["30代", "40代"] targeted
    status: string;
    createdAt: admin.firestore.Timestamp;
}

// Region adjacency map is now fetched from DB

export async function runMatchingForQuestion(questionId: string, isRetry = false) {
    logger.info(`Starting matching for question: ${questionId}`);

    const qRef = db.collection('questions').doc(questionId);
    const qSnap = await qRef.get();
    if (!qSnap.exists) {
        logger.error(`Question ${questionId} not found`);
        return;
    }
    const question = { id: qSnap.id, ...qSnap.data() } as Question;

    if (question.status === 'closed' || question.status === 'answered') {
        logger.info(`Question ${questionId} is already ${question.status}. Skipping.`);
        return;
    }

    // 1. Find Candidates
    let candidates = await fetchCandidatesByRegion(question.region);
    let regionMatchLevel = 2; // Exact match points

    if (candidates.length === 0) {
        // Try adjacent regions from Master DB
        try {
            const masterDoc = await db.collection('masters').doc(`region-${question.region}`).get();
            const masterData = masterDoc.data();
            const adjacent = masterData?.adjacentRegions || [];

            if (adjacent.length > 0) {
                candidates = await fetchCandidatesByRegions(adjacent);
                regionMatchLevel = 1; // Adjacent match points
            }
        } catch (e) {
            logger.error(`Failed to fetch region master for ${question.region}`, e);
        }
    }

    // If still 0? Fallback to all? Or stop.
    // Requirement says: "Search match group...". If 0, search adjacent match group.

    // Filter by notified history
    const notifiedRef = qRef.collection('notified_users');
    const notifiedSnap = await notifiedRef.get();
    const notifiedIds = new Set(notifiedSnap.docs.map(d => d.id));

    // Also exclude the question author
    notifiedIds.add(question.userId);

    let eligible = candidates.filter(u => !notifiedIds.has(u.id));

    // Scoring
    // Category Match: 3pt
    // Region Match: 2pt (Exact) or 1pt (Adjacent) - handled by regionMatchLevel
    // Age Match: 1pt

    const scored = eligible.map(u => {
        let score = 0;

        // Region Score
        score += regionMatchLevel;

        // Category Score (3pt)
        // Match if User.categories includes Question.category
        // OR Question.categoryIds include any of User.categories
        const qCats = new Set(question.categoryIds || [question.category]);
        const uCats = u.categories || [];
        const hasCategoryMatch = uCats.some(c => qCats.has(c));
        if (hasCategoryMatch) score += 3;

        // Age Score (1pt)
        // Logic: Calculate age from birthYear. Check if in question.ageGroups.
        // Simplification: Check if birthYear roughly matches target generation.
        if (checkAgeMatch(u.birthYear, question.ageGroups)) {
            score += 1;
        }

        return { user: u, score };
    });

    // Sort by Score DESC
    scored.sort((a, b) => b.score - a.score);

    // Pick Top 10
    const selected = scored.slice(0, 10);

    if (selected.length === 0) {
        logger.info(`No matching users found for Question ${questionId}`);
        await qRef.update({ status: 'matching_failed' });
        // Notify author?
        return;
    }

    // Send Notifications
    const batch = db.batch();
    const notifications: Promise<any>[] = [];

    for (const item of selected) {
        const u = item.user;
        if (!u.lineUserId) continue;

        // Add to notified history
        const nuRef = notifiedRef.doc(u.id);
        batch.set(nuRef, {
            notifiedAt: admin.firestore.Timestamp.now(),
            score: item.score
        });

        // Send LINE
        notifications.push(
            lineClient.pushMessage(u.lineUserId, {
                type: 'text',
                text: `【新着Q&A】あなたの知識が必要です！\n\n${question.title}\n\nカテゴリ: ${question.category}\n地域: ${question.region}\n\n回答する: https://medily-app.web.app/questions/${question.id}`
            }).catch(e => logger.error(`Failed to send LINE to ${u.id}`, e))
        );
    }

    await batch.commit();
    await Promise.all(notifications);
    await qRef.update({
        status: 'waiting_for_answer',
        lastMatchedAt: admin.firestore.Timestamp.now()
    });

    logger.info(`Matched ${selected.length} users for Question ${questionId}`);
}

async function fetchCandidatesByRegion(region: string): Promise<UserProfile[]> {
    const snap = await db.collection('users')
        .where('notificationConsent', '==', true)
        .where('region', '==', region)
        .get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as UserProfile));
}

async function fetchCandidatesByRegions(regions: string[]): Promise<UserProfile[]> {
    if (regions.length === 0) return [];
    // Firestore 'in' query allows up to 10
    const chunks = [];
    for (let i = 0; i < regions.length; i += 10) {
        chunks.push(regions.slice(i, i + 10));
    }

    let users: UserProfile[] = [];
    for (const chunk of chunks) {
        const snap = await db.collection('users')
            .where('notificationConsent', '==', true)
            .where('region', 'in', chunk)
            .get();
        users = users.concat(snap.docs.map(d => ({ id: d.id, ...d.data() } as UserProfile)));
    }
    return users;
}

function checkAgeMatch(birthYearStr?: string, targetGroups?: string[]): boolean {
    if (!birthYearStr || !targetGroups || targetGroups.length === 0) return false;
    const birthYear = parseInt(birthYearStr);
    if (isNaN(birthYear)) return false;

    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    // Map age to group
    const ageGroup = Math.floor(age / 10) * 10 + "代";
    return targetGroups.includes(ageGroup);
}
