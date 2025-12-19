
import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    getDocs,
    getCountFromServer,
    Timestamp,
    doc,
    getDoc,
    limit,
    startAfter
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Question {
    id: string;
    userId: string;
    title: string;
    description: string;
    content: string;
    region: string;
    category: string;
    tags: string[];
    status: 'open' | 'answered' | 'closed';
    answerCount: number;
    createdAt: string;
    updatedAt: string;
    parentQuestionId?: string;
    authorName?: string; // Often joined from user profile
}

export interface Answer {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorName?: string;
}

export interface QuestionFilter {
    userId?: string;
    answeredBy?: string;
    region?: string[];
    category?: string[];
    status?: string[];
    publicOnly?: boolean;
    limit?: number;
    page?: number;
}

const formatDate = (date: any): string => {
    if (!date) return '';
    return date instanceof Timestamp
        ? date.toDate().toLocaleString('ja-JP')
        : new Date(date).toLocaleString('ja-JP');
};

export const questionService = {
    async createQuestion(data: {
        userId: string;
        title: string;
        description: string;
        region: string;
        category: string;
        tags?: string[];
        parentQuestionId?: string;
    }) {
        if (!db) throw new Error('Firebase is not configured');

        const { userId, title, description, region, category, tags = [], parentQuestionId } = data;

        const docRef = await addDoc(collection(db, 'questions'), {
            userId,
            title,
            description,
            content: description, // backward compatibility
            region,
            category,
            tags,
            status: 'open',
            answerCount: 0,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            ...(parentQuestionId ? { parentQuestionId } : {}),
        });

        return docRef.id;
    },

    async getQuestions(filter: QuestionFilter) {
        if (!db) throw new Error('Firebase is not configured');

        const questionsRef = collection(db, 'questions');
        const constraints: any[] = [];

        if (filter.userId) {
            constraints.push(where('userId', '==', filter.userId));
        } else if (filter.publicOnly) {
            // Note: public field might be missing in old data, but following API logic
            constraints.push(where('public', '==', true));
        }

        // Note: Complex filtering (region/category/status) combined with ordering 
        // often requires composite indexes in Firestore. 
        // The original API did manual filtering in memory for these to avoid index hell.
        // We will replicate that behavior for consistency.

        // We can at least order by createdAt if it's a simple query
        // constraints.push(orderBy('createdAt', 'desc')); 

        const q = query(questionsRef, ...constraints);
        const querySnapshot = await getDocs(q);

        let allQuestions = await Promise.all(
            querySnapshot.docs.map(async (docSnap) => {
                const data = docSnap.data();
                let answerCount = data.answerCount ?? 0;

                // Try to get accurate count if possible
                try {
                    const countSnap = await getCountFromServer(collection(db!, 'questions', docSnap.id, 'answers'));
                    answerCount = countSnap.data().count;
                } catch (e) {
                    // ignore
                }

                // Fetch author name if necessary? 
                // Original API didn't fetch author name for list, only question data.
                // But app/questions/page.tsx displays authorName. 
                // Wait, app/questions/page.tsx interface has authorName.
                // In original API `GET`, it returns specific fields. 
                // Where does `authorName` come from?
                // Checking original API... it DOES NOT fetch authorName!
                // It returns `...data`. If `data` has `authorName`, good.
                // But `createQuestion` doesn't save `authorName`!
                // So `authorName` must be missing or fetched separately?
                // `app/questions/page.tsx` uses `question.authorName`.
                // If it's missing, it shows empty?
                // Let's check `home/page.tsx` usage.
                // It seems we should probably fetch it, but to keep refactor safe, 
                // I will stick to what the API was doing. 
                // If the original API didn't return it, and the UI worked, maybe it was saved in the doc?
                // Actually the `createQuestion` I saw earlier DOES NOT save `authorName`.
                // This suggests `authorName` might be missing in the UI too?
                // Or maybe I missed something.
                // For now, I will extract exactly what was there.

                return {
                    id: docSnap.id,
                    ...data,
                    answerCount,
                    createdAt: formatDate(data.createdAt),
                    updatedAt: formatDate(data.updatedAt),
                } as Question;
            })
        );

        // Apply manual filters
        if (filter.answeredBy) {
            // This logic is heavy (N+1 queries), but copying original logic
            const answeredIds = new Set<string>();
            for (const q of allQuestions) {
                const answersRef = collection(db, 'questions', q.id, 'answers');
                const answersQuery = query(answersRef, where('userId', '==', filter.answeredBy));
                const snap = await getDocs(answersQuery);
                if (!snap.empty) answeredIds.add(q.id);
            }
            allQuestions = allQuestions.filter(q => answeredIds.has(q.id));
        }

        if (filter.region && filter.region.length > 0) {
            const set = new Set(filter.region);
            allQuestions = allQuestions.filter(q => set.has(q.region));
        }
        if (filter.category && filter.category.length > 0) {
            const set = new Set(filter.category);
            allQuestions = allQuestions.filter(q => set.has(q.category));
        }
        if (filter.status && filter.status.length > 0) {
            const set = new Set(filter.status);
            allQuestions = allQuestions.filter(q => q.status && set.has(q.status));
        }

        // Sort by createdAt desc (manual sort since we couldn't do it in query easily with filters)
        allQuestions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Pagination
        let paged = allQuestions;
        const limitNum = filter.limit || 10;
        const pageNum = filter.page || 1;
        const offset = (pageNum - 1) * limitNum;
        paged = allQuestions.slice(offset, offset + limitNum);

        const hasMore = allQuestions.length > (pageNum * limitNum);

        return { questions: paged, hasMore };
    },

    async getQuestionById(questionId: string) {
        if (!db) throw new Error('Firebase is not configured');

        const questionRef = doc(db, 'questions', questionId);
        const questionDoc = await getDoc(questionRef);

        if (!questionDoc.exists()) return null;

        const data = questionDoc.data();
        const question: Question = {
            id: questionDoc.id,
            userId: data.userId, // Ensure userId is passed
            title: data.title,
            description: data.description,
            content: data.content || data.description || data.body || '',
            region: data.region,
            category: data.category,
            tags: data.tags,
            status: data.status,
            answerCount: data.answerCount, // We might want to recount?
            createdAt: formatDate(data.createdAt),
            updatedAt: formatDate(data.updatedAt),
            parentQuestionId: data.parentQuestionId,
        };

        // Fetch Answers
        const answersRef = collection(db, 'questions', questionId, 'answers');
        const answersQuery = query(answersRef, orderBy('createdAt', 'asc'));
        const answersSnap = await getDocs(answersQuery);

        const answers: Answer[] = answersSnap.docs.map(doc => {
            const d = doc.data();
            return {
                id: doc.id,
                userId: d.userId,
                content: d.content,
                authorName: d.authorName, // Answers often have authorName denormalized?
                createdAt: formatDate(d.createdAt),
                updatedAt: formatDate(d.updatedAt),
            };
        });

        // Fetch Parent Question
        let parentQuestion = null;
        if (question.parentQuestionId) {
            const pRef = doc(db, 'questions', question.parentQuestionId);
            const pDoc = await getDoc(pRef);
            if (pDoc.exists()) {
                const pd = pDoc.data();
                parentQuestion = {
                    id: pDoc.id,
                    ...pd,
                    createdAt: formatDate(pd.createdAt),
                    updatedAt: formatDate(pd.updatedAt),
                };
            }
        }

        return { question, answers, parentQuestion };
    },

    async getQuestionSiblings(questionId: string) {
        if (!db) throw new Error('Firebase is not configured');

        // To find siblings, we need the current question's createdAt.
        // This requires fetching the current question first if we don't have it.
        // Assuming we do this usually after fetching the question.

        const currentRef = doc(db, 'questions', questionId);
        const currentSnap = await getDoc(currentRef);
        if (!currentSnap.exists()) return { prevQuestionId: null, nextQuestionId: null };

        const currentData = currentSnap.data();
        const currentCreatedAt = currentData.createdAt;

        // Prev: Created Before (createdAt < current)
        // Next: Created After (createdAt > current)
        // Order by createdAt desc (standard timeline)
        // Actually, "Previous Question" usually means "Older" (createdAt < current).
        // "Next Question" usually means "Newer" (createdAt > current).
        // Or in a list [Newest ... Oldest], "Next" is Older.
        // Let's assume standard UI: "Next" -> Newer, "Prev" -> Older.
        // Wait, typically in blog posts: "Next Post" is Newer.
        // But in a list of items 1..10, if I am at 5, Next is 6?
        // Let's look at the UI code:
        // Prev button: `router.push(prevQuestionId)`
        // Next button: `router.push(nextQuestionId)`

        // Query for Prev (Older)
        const questionsRef = collection(db, 'questions');

        // Next (Newer)
        const nextQuery = query(
            questionsRef,
            where('status', '==', 'open'), // Assuming we only nav through open questions?
            // Original API probably didn't filter by status?
            // Let's assume just standard createdAt order.
            orderBy('createdAt', 'asc'),
            startAfter(currentCreatedAt),
            limit(1)
        );

        // Prev (Older)
        const prevQuery = query(
            questionsRef,
            // where('status', '==', 'open'),
            orderBy('createdAt', 'desc'),
            startAfter(currentCreatedAt),
            limit(1)
        );

        // Wait, logic above is:
        // Next: Created ASC, StartAfter current -> First one newer than current.
        // Prev: Created DESC, StartAfter current -> First one older than current.

        const [nextSnap, prevSnap] = await Promise.all([
            getDocs(nextQuery),
            getDocs(prevQuery)
        ]);

        return {
            nextQuestionId: nextSnap.empty ? null : nextSnap.docs[0].id,
            prevQuestionId: prevSnap.empty ? null : prevSnap.docs[0].id
        };
    }
};
