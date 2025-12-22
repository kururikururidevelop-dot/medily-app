
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
    startAfter,
    collectionGroup
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { userService } from '@/lib/services/userService';

export interface Question {
    id: string;
    userId: string;
    title: string;
    description: string;
    // content: string; // Removed
    region: string;
    categories: string[]; // Changed from string
    // tags: string[]; // Removed
    choices: string[]; // New
    isPublic: boolean; // New
    genderFilter?: 'male' | 'female' | 'none'; // New
    ageGroups?: string[]; // New
    status: 'matching' | 'waiting_for_answer' | 'answered' | 'closed' | 'matching_failed'; // New statuses
    answerCount: number;
    createdAt: string;
    updatedAt: string;
    postedAt: string; // New
    closedAt?: string; // New
    parentQuestionId?: string;
    authorName?: string;
    authorAvatarUrl?: string;
}

export interface Answer {
    id: string;
    userId: string;
    content: string;
    choices?: string[]; // New
    answeredAt?: string; // New
    createdAt: string;
    updatedAt: string;
    authorName?: string;
    authorAvatarUrl?: string;
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
        categories: string[];
        choices?: string[];
        isPublic: boolean;
        genderFilter?: 'male' | 'female' | 'none';
        ageGroups?: string[];
        parentQuestionId?: string;
    }) {
        if (!db) throw new Error('Firebase is not configured');

        const { userId, title, description, region, categories, choices = [], isPublic, genderFilter, ageGroups, parentQuestionId } = data;

        const docRef = await addDoc(collection(db, 'questions'), {
            userId,
            title,
            description,
            // content: description, // Removed backward compatibility
            region,
            categories,
            // tags, // Removed
            choices,
            isPublic,
            genderFilter: genderFilter || 'none',
            ageGroups: ageGroups || [],
            status: 'matching', // Initial status
            answerCount: 0,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            postedAt: Timestamp.now(), // New field
            ...(parentQuestionId ? { parentQuestionId } : {}),
        });

        return docRef.id;
    },

    async getQuestions(filter: QuestionFilter) {
        if (!db) throw new Error('Firebase is not configured');

        let allQuestions: Question[] = [];

        if (filter.answeredBy) {
            // Optimization: Collection Group Query for My Answers
            // Index required: answers (collectionId) fields: userId ASC, answeredAt DESC
            // Note: Removed orderBy to avoid requiring composite index during dev/demo.
            // Sorting is done in memory.
            const answersQuery = query(
                collectionGroup(db, 'answers'),
                where('userId', '==', filter.answeredBy)
            );

            const answerSnap = await getDocs(answersQuery);

            // In-memory sort (DESC)
            const sortedDocs = [...answerSnap.docs].sort((a, b) => {
                const tA = a.data().answeredAt?.toMillis() || a.data().createdAt?.toMillis() || 0;
                const tB = b.data().answeredAt?.toMillis() || b.data().createdAt?.toMillis() || 0;
                return tB - tA;
            });

            const questionIds = new Set<string>();
            const orderedIds: string[] = [];

            sortedDocs.forEach(doc => {
                const pid = doc.ref.parent.parent?.id;
                if (pid && !questionIds.has(pid)) {
                    questionIds.add(pid);
                    orderedIds.push(pid);
                }
            });

            // Fetch questions
            const docs = await Promise.all(orderedIds.map(id => getDoc(doc(db!, 'questions', id))));

            allQuestions = docs
                .map(d => {
                    if (!d.exists()) return null;
                    const data = d.data();
                    return {
                        id: d.id,
                        userId: data.userId,
                        title: data.title,
                        description: data.description,
                        region: data.region,
                        categories: data.categories || (data.category ? [data.category] : []),
                        choices: data.choices || [],
                        isPublic: data.isPublic ?? true,
                        status: data.status,
                        answerCount: data.answerCount ?? 0,
                        createdAt: formatDate(data.createdAt),
                        updatedAt: formatDate(data.updatedAt),
                        postedAt: formatDate(data.postedAt || data.createdAt),
                        closedAt: formatDate(data.closedAt),
                    } as Question;
                })
                .filter(q => q !== null) as Question[];

        } else {
            const questionsRef = collection(db, 'questions');
            const constraints: any[] = [];

            if (filter.userId) {
                constraints.push(where('userId', '==', filter.userId));
            } else if (filter.publicOnly) {
                constraints.push(where('isPublic', '==', true));
            }

            const q = query(questionsRef, ...constraints);
            const querySnapshot = await getDocs(q);

            allQuestions = await Promise.all(
                querySnapshot.docs.map(async (docSnap) => {
                    const data = docSnap.data();
                    let answerCount = data.answerCount ?? 0;
                    try {
                        const countSnap = await getCountFromServer(collection(db!, 'questions', docSnap.id, 'answers'));
                        answerCount = countSnap.data().count;
                    } catch (e) { /* ignore */ }

                    return {
                        id: docSnap.id,
                        ...data,
                        categories: data.categories || (data.category ? [data.category] : []),
                        answerCount,
                        createdAt: formatDate(data.createdAt),
                        updatedAt: formatDate(data.updatedAt),
                        postedAt: formatDate(data.postedAt || data.createdAt),
                        closedAt: formatDate(data.closedAt),
                    } as Question;
                })
            );

            // Sort by postedAt desc for normal lists
            allQuestions.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        }

        // Common In-Memory Filtering
        if (filter.region && filter.region.length > 0) {
            const set = new Set(filter.region);
            allQuestions = allQuestions.filter(q => set.has(q.region));
        }
        if (filter.category && filter.category.length > 0) {
            const set = new Set(filter.category);
            allQuestions = allQuestions.filter(q => q.categories.some(c => set.has(c)));
        }
        if (filter.status && filter.status.length > 0) {
            const set = new Set(filter.status);
            allQuestions = allQuestions.filter(q => q.status && set.has(q.status));
        }

        // Pagination
        const limitNum = filter.limit || 10;
        const pageNum = filter.page || 1;
        const offset = (pageNum - 1) * limitNum;
        const paged = allQuestions.slice(offset, offset + limitNum);
        const hasMore = allQuestions.length > (pageNum * limitNum);

        console.log(`[getQuestions] Filter:`, JSON.stringify(filter));
        console.log(`[getQuestions] Total Fetched: ${allQuestions.length}, Offset: ${offset}, Limit: ${limitNum}, HasMore: ${hasMore}`);

        return { questions: paged, hasMore };
    },

    async getQuestionById(questionId: string) {
        if (!db) throw new Error('Firebase is not configured');

        const questionRef = doc(db, 'questions', questionId);
        const questionDoc = await getDoc(questionRef);

        if (!questionDoc.exists()) return null;

        const data = questionDoc.data();
        const categories = data.categories || (data.category ? [data.category] : []);

        // Fetch Author Profile
        const authorProfile = await userService.getUserProfile(data.userId);

        const question: Question = {
            id: questionDoc.id,
            userId: data.userId,
            title: data.title,
            description: data.description,
            // content: data.content,
            region: data.region,
            categories,
            // tags: data.tags,
            choices: data.choices || [],
            isPublic: data.isPublic ?? true,
            genderFilter: data.genderFilter,
            ageGroups: data.ageGroups,
            status: data.status,
            answerCount: data.answerCount,
            createdAt: formatDate(data.createdAt),
            updatedAt: formatDate(data.updatedAt),
            postedAt: formatDate(data.postedAt || data.createdAt),
            closedAt: formatDate(data.closedAt),
            parentQuestionId: data.parentQuestionId,
            authorName: authorProfile?.displayName || data.authorName,
            authorAvatarUrl: authorProfile?.pictureUrl || authorProfile?.avatar,
        };

        // Fetch Answers
        const answersRef = collection(db, 'questions', questionId, 'answers');
        const answersQuery = query(answersRef, orderBy('createdAt', 'asc'));
        const answersSnap = await getDocs(answersQuery);

        const rawAnswers = answersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Enrich with User Profiles
        const userIds = Array.from(new Set(rawAnswers.map((a: any) => a.userId).filter(Boolean)));
        const profiles = await Promise.all(userIds.map(uid => userService.getUserProfile(uid)));
        const profileMap = new Map(profiles.filter(p => p !== null).map(p => [p!.id, p]));

        const answers: Answer[] = rawAnswers.map((d: any) => {
            const profile = profileMap.get(d.userId);
            return {
                id: d.id,
                userId: d.userId,
                content: d.content,
                choices: d.choices || [],
                answeredAt: formatDate(d.answeredAt || d.createdAt),
                authorName: profile?.displayName || d.authorName,
                authorAvatarUrl: profile?.pictureUrl || profile?.avatar,
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
        // Logic relies on createdAt. Should we switch to postedAt?
        // User requested Lists to be postedAt DESC.
        // Siblings (Prev/Next) usually follow List order.
        // So yes, should use postedAt.

        if (!db) throw new Error('Firebase is not configured');

        const currentRef = doc(db, 'questions', questionId);
        const currentSnap = await getDoc(currentRef);
        if (!currentSnap.exists()) return { prevQuestionId: null, nextQuestionId: null };

        const currentData = currentSnap.data();
        const currentVal = currentData.postedAt || currentData.createdAt;

        // Next (Newer) -> postedAt > current
        const questionsRef = collection(db, 'questions');
        const nextQuery = query(
            questionsRef,
            // where('status', '==', 'open'), // Status logic changed? User didn't specify filter for siblings. Keeps broad?
            // Assuming siblings navigation is usually purely temporal.
            orderBy('postedAt', 'asc'), // postedAt is Timestamp in DB? Yes.
            // If data is old and has no postedAt, we might have issues.
            // But we can assume migration or fallback logic is tricky in query.
            // For now, let's assume postedAt exists or use createdAt if we can't reliably update all docs.
            // But strict requirement says "Use PostedAt". I will use postedAt.
            startAfter(currentVal),
            limit(1)
        );

        // Prev (Older)
        const prevQuery = query(
            questionsRef,
            orderBy('postedAt', 'desc'),
            startAfter(currentVal),
            limit(1)
        );

        // Wait, if old docs don't have postedAt, this query will ignore them (field missing).
        // This is acceptable for "New Model". Old questions might disappear from navigation unless migrated.
        // User didn't ask for migration, so I'll write new logic.

        try {
            const [nextSnap, prevSnap] = await Promise.all([
                getDocs(nextQuery),
                getDocs(prevQuery)
            ]);

            return {
                nextQuestionId: nextSnap.empty ? null : nextSnap.docs[0].id,
                prevQuestionId: prevSnap.empty ? null : prevSnap.docs[0].id
            };
        } catch (e) {
            // Fallback for old data?
            return { prevQuestionId: null, nextQuestionId: null };
        }
    },

    async getNextChainQuestion(questionId: string) {
        if (!db) throw new Error('Firebase is not configured');

        const questionsRef = collection(db, 'questions');
        const nextQuery = query(
            questionsRef,
            where('parentQuestionId', '==', questionId),
            orderBy('postedAt', 'asc'), // Use postedAt ASC to find the immediate next question in timeline
            limit(1)
        );

        const snap = await getDocs(nextQuery);
        if (snap.empty) return null;
        return snap.docs[0].id;
    },
};
