import { Either, success } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionsInput {
  page: number
}

type FetchRecentQuestionsOutput = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute({
    page,
  }: FetchRecentQuestionsInput): Promise<FetchRecentQuestionsOutput> {
    const questions = await this.questionsRepository.findManyRecent({ page })
    return success({ questions })
  }
}
