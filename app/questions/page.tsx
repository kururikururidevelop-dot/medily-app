
import { questionService } from '@/lib/services/questionService';
import PublicQuestionsClient from './PublicQuestionsClient';
import { masterService } from '@/lib/services/masterService';

export const dynamic = 'force-dynamic'; // Ensure we always fetch latest data (no static cache for this list)

export default async function PublicQuestionsPage() {
    // Initial Fetch: Public = true, status = open, limit = 10, page = 1.
    // Fetch master categories and regions for filters and display.
    const [initialData, categories, regions] = await Promise.all([
        questionService.getQuestions({
            publicOnly: true,
            status: ['open'],
            limit: 10,
            page: 1
        }),
        masterService.getMasters('category'),
        masterService.getMasters('region')
    ]);

    return (
        <PublicQuestionsClient
            initialQuestions={initialData.questions}
            initialHasMore={initialData.hasMore}
            initialPage={1}
            initialCategories={categories}
            initialRegions={regions}
        />
    );
}
