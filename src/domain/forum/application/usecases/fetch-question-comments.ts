import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsInput {
  questionId: string
  page: number
}

interface FetchQuestionCommentsOutput {
  comments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  public async execute({
    questionId,
    page,
  }: FetchQuestionCommentsInput): Promise<FetchQuestionCommentsOutput> {
    const comments = await this.questionCommentsRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )
    return { comments }
  }
}
