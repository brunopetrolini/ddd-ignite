import { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answer-repository';

interface AnswerQuestionUseCaseInput {
  instructorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseInput) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
      createdAt: new Date(),
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
