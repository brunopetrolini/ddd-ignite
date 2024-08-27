import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentInput {
  authorId: string
  commentId: string
}

type DeleteQuestionCommentOutput = void

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  public async execute({
    authorId,
    commentId,
  }: DeleteQuestionCommentInput): Promise<DeleteQuestionCommentOutput> {
    const comment = await this.questionCommentsRepository.findById(commentId)

    if (!comment) {
      throw new Error('Comment not found.')
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentsRepository.delete(comment)
  }
}
