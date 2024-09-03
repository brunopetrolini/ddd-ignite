import { Either, failure, success } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteAnswerInput {
  authorId: string
  answerId: string
}

type DeleteAnswerOutput = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  public async execute({
    authorId,
    answerId,
  }: DeleteAnswerInput): Promise<DeleteAnswerOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)
    return success({})
  }
}
