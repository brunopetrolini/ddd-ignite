import { Either, failure, success } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteAnswerCommentInput {
  authorId: string
  commentId: string
}

type DeleteAnswerCommentOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  public async execute({
    authorId,
    commentId,
  }: DeleteAnswerCommentInput): Promise<DeleteAnswerCommentOutput> {
    const comment = await this.answerCommentsRepository.findById(commentId)

    if (!comment) {
      return failure(new ResourceNotFoundError())
    }

    if (comment.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(comment)
    return success({})
  }
}
