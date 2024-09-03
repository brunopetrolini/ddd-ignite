import { Either, failure, success } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteQuestionInput {
  authorId: string
  questionId: string
}

type DeleteQuestionOutput = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    questionId,
  }: DeleteQuestionInput): Promise<DeleteQuestionOutput> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)
    return success({})
  }
}
