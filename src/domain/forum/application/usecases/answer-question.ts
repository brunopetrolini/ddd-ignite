import { Either, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseInput {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseOutput = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  public async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseInput): Promise<AnswerQuestionUseCaseOutput> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)
    return success({ answer })
  }
}
