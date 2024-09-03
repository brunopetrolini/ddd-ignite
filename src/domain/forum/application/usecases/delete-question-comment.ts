import { Either, failure, success } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeleteQuestionCommentInput {
  authorId: string
  commentId: string
}

type DeleteQuestionCommentOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

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
      return failure(new ResourceNotFoundError())
    }

    if (comment.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(comment)
    return success({})
  }
}
