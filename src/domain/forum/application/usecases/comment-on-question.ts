import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CommentOnQuestionInput {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionOutput = void

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
      throw new Error('Question not found.')
    }

    const comment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(comment)
  }
}
