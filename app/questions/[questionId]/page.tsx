import { questionService } from '@/lib/services/questionService';
import QuestionDetailClient from './QuestionDetailClient';
import { notFound } from 'next/navigation';
import { masterService } from '@/lib/services/masterService';

interface Props {
  params: Promise<{
    questionId: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function QuestionDetailPage({ params }: Props) {
  const { questionId } = await params;

  // Fetch current question and master data in parallel
  const [data, masterCategories] = await Promise.all([
    questionService.getQuestionById(questionId),
    masterService.getCategoryMap()
  ]);

  if (!data || !data.question) {
    notFound();
  }

  // Chain Navigation Logic:
  // Prev: Parent Question
  // Next: First Child (Chain continues)
  const prevQuestionId = data.question.parentQuestionId || null;
  const nextQuestionId = await questionService.getNextChainQuestion(questionId);

  return (
    <QuestionDetailClient
      initialQuestion={data.question}
      initialAnswers={data.answers}
      initialPrevId={prevQuestionId}
      initialNextId={nextQuestionId}
      masterCategories={masterCategories}
    />
  );
}
