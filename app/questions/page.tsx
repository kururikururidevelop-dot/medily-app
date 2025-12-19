
import { questionService } from '@/lib/services/questionService';
import PublicQuestionsClient from './PublicQuestionsClient';

export const dynamic = 'force-dynamic'; // Ensure we always fetch latest data (no static cache for this list)

export default async function PublicQuestionsPage() {
    // Initial Fetch: Public = true, status = open, limit = 10, page = 1.
    // We ignore searchParams for initial SSR to keep it simple and cacheable if we wanted,
    // but here we just fetch standard initial view.
    // Actually, honoring searchParams would be even better for deep linking, but 
    // currently the client side handles filtering via state. 
    // If we want correct Deep Linking, we should pass router params to server.
    // But the existing `PublicQuestionsClient` uses `useState` for filters (region, category).
    // Migrating that to URL-based state is a larger refactor (though recommended).
    // For now, I will just fetch the default "All Open Questions" for SSR.

    const initialData = await questionService.getQuestions({
        publicOnly: true,
        status: ['open'],
        limit: 10,
        page: 1
    });

    return (
        <PublicQuestionsClient
            initialQuestions={initialData.questions}
            initialHasMore={initialData.hasMore}
            initialPage={1}
        />
    );
}
