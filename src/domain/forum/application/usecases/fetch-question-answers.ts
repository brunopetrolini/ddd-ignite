import { Either, success } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswersInput {
  questionId: string
  page: number
}

type FetchQuestionAnswersOutput = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswersUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  public async execute({
    questionId,
    page,
  }: FetchQuestionAnswersInput): Promise<FetchQuestionAnswersOutput> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )
    return success({ answers })
  }
}
