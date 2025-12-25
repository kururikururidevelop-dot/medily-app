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
  // Chain Navigation Logic:
  const prevQuestionId = data.question.parentQuestionId || null;
  const nextQuestionId = await questionService.getNextChainQuestion(questionId);

  // Filter Answers:
  // 1. Question Owner sees ALL answers.
  // 2. Answerer sees ONLY their own answers.
  // 3. Others see nothing (or public? Requirements say "Login user's answered data only")
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const currentUserId = cookieStore.get('userId')?.value || 'dev-mock-user';

  console.log('[QuestionDetail] CurrentUser:', currentUserId);
  console.log('[QuestionDetail] QuestionOwner:', data.question.userId);
  console.log('[QuestionDetail] Total Answers:', data.answers.length);

  const filteredAnswers = data.answers.filter(a => {
    const isQuestionOwner = data.question.userId === currentUserId;
    const isAnswerOwner = a.userId === currentUserId;
    // console.log(`[Filter] AnswerID: ${a.id}, AnswerUser: ${a.userId}, Keep: ${isQuestionOwner || isAnswerOwner}`);
    return isQuestionOwner || isAnswerOwner;
  });

  return (
    <QuestionDetailClient
      initialQuestion={data.question}
      initialAnswers={filteredAnswers}
      initialPrevId={prevQuestionId}
      initialNextId={nextQuestionId}
      masterCategories={masterCategories}
    />
  );
}
