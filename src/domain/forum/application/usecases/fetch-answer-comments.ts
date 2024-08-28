import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsInput {
  answerId: string
  page: number
}

interface FetchAnswerCommentsOutput {
  comments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  public async execute({
    answerId,
    page,
  }: FetchAnswerCommentsInput): Promise<FetchAnswerCommentsOutput> {
    const comments = await this.answerCommentsRepository.findManyByAnswerId(
      answerId,
      {
        page,
      },
    )
    return { comments }
  }
}
