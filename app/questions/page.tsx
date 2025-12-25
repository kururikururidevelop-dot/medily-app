
import { questionService } from '@/lib/services/questionService';
import PublicQuestionsClient from './PublicQuestionsClient';
import { masterService } from '@/lib/services/masterService';

export const dynamic = 'force-dynamic'; // Ensure we always fetch latest data (no static cache for this list)

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PublicQuestionsPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const currentUserId = cookieStore.get('userId')?.value;

    // Parse filters from searchParams
    const keyword = typeof searchParams.keyword === 'string' ? searchParams.keyword : undefined;
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const region = typeof searchParams.region === 'string' ? [searchParams.region] : (Array.isArray(searchParams.region) ? searchParams.region : undefined);
    const category = typeof searchParams.category === 'string' ? [searchParams.category] : (Array.isArray(searchParams.category) ? searchParams.category : undefined);

    // Initial Fetch: Public = true, status = open, limit = 10, page = 1.
    // Fetch master categories and regions for filters and display.
    const [initialData, categories, regions] = await Promise.all([
        questionService.getQuestions({
            publicOnly: true,
            status: ['matching', 'waiting_for_answer', 'matching_failed'],
            limit: 10,
            page: page,
            keyword: keyword,
            region: region,
            category: category,
            excludeUserId: currentUserId,
        }),
        masterService.getMasters('category'),
        masterService.getMasters('region')
    ]);

    return (
        <PublicQuestionsClient
            initialQuestions={initialData.questions}
            initialHasMore={initialData.hasMore}
            initialPage={page}
            initialCategories={categories}
            initialRegions={regions}
            currentUserId={currentUserId}
        />
    );
}
