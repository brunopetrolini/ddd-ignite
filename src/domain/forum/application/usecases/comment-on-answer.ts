import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CommentOnAnswerInput {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerOutput = Either<
  ResourceNotFoundError,
  {
    comment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  public async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerInput): Promise<CommentOnAnswerOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    const comment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(comment)
    return success({ comment })
  }
}
