import { Either, failure, success } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentInput {
  authorId: string
  commentId: string
}

type DeleteAnswerCommentOutput = Either<string, void>

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
      return failure('Comment not found.')
    }

    if (comment.authorId.toString() !== authorId) {
      return failure('Not allowed.')
    }

    await this.answerCommentsRepository.delete(comment)
    return success()
  }
}
