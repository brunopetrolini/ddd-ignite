import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

describe('Fetch Recent Questions [Use Case]', () => {
  let questionsRepository: InMemoryQuestionsRepository
  let sut: FetchRecentQuestionsUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(questionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date('2024-08-15') }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date('2024-08-13') }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date('2024-08-17') }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2024-08-17') }),
      expect.objectContaining({ createdAt: new Date('2024-08-15') }),
      expect.objectContaining({ createdAt: new Date('2024-08-13') }),
    ])
  })

  it('should be able to fetch recent questions with pagination', async () => {
    const questionsPromises = Array.from({ length: 30 }, () =>
      questionsRepository.create(makeQuestion()),
    )
    await Promise.all(questionsPromises)

    const resultPageOne = await sut.execute({ page: 1 })
    const resultPageTwo = await sut.execute({ page: 2 })

    expect(resultPageOne.value?.questions).toHaveLength(20)
    expect(resultPageTwo.value?.questions).toHaveLength(10)
    expect(resultPageOne.value?.questions).not.toEqual(
      resultPageTwo.value?.questions,
    )
  })
})
