import { Either, success } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugUseCaseInput {
  slug: string
}

type GetQuestionBySlugUseCaseOutput = Either<
  null,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute({
    slug,
  }: GetQuestionBySlugUseCaseInput): Promise<GetQuestionBySlugUseCaseOutput> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return success({ question })
  }
}
