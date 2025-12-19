
import { questionService } from '@/lib/services/questionService';
import QuestionDetailClient from './QuestionDetailClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    questionId: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function QuestionDetailPage({ params }: Props) {
  const { questionId } = await params;

  // Parallel fetch: Question+Answers, and Siblings
  const [data, siblings] = await Promise.all([
    questionService.getQuestionById(questionId),
    questionService.getQuestionSiblings(questionId)
  ]);

  if (!data || !data.question) {
    notFound();
  }

  // AuthorName filling?
  // If `authorName` was not in DB, we might want to fetch it from userService?
  // But for now, assuming it's in data or acceptable as is (backward compat).

  return (
    <QuestionDetailClient
      initialQuestion={data.question}
      initialAnswers={data.answers}
      initialPrevId={siblings.prevQuestionId}
      initialNextId={siblings.nextQuestionId}
    />
  );
}
