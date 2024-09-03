import { Either, failure, success } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface ChooseQuestionBestAnswerInput {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  public async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerInput): Promise<ChooseQuestionBestAnswerOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    const questionId = answer.questionId.toString()
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    question.bestAnswerId = answer.id
    await this.questionsRepository.update(question)
    return success({})
  }
}
