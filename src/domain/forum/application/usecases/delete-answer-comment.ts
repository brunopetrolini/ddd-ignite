import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentInput {
  authorId: string
  commentId: string
}

type DeleteAnswerCommentOutput = void

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
      throw new Error('Comment not found.')
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentsRepository.delete(comment)
  }
}
