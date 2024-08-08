import { Answer } from '../entities/answer';

interface AnswerQuestionUseCaseInput {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  public execute({ instructorId, questionId, content }: AnswerQuestionUseCaseInput) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    });
    return answer;
  }
}
