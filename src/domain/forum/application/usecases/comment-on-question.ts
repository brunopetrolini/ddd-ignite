import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CommentOnQuestionInput {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionOutput = Either<
  ResourceNotFoundError,
  {
    comment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  public async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionInput): Promise<CommentOnQuestionOutput> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    const comment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(comment)
    return success({ comment })
  }
}
