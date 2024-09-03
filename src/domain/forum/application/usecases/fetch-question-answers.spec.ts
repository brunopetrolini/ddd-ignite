import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

describe('Fetch Question Answers [Use Case]', () => {
  let answersRepository: InMemoryAnswersRepository
  let sut: FetchQuestionAnswersUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(answersRepository)
  })

  it('should be able to fetch the answers of a question', async () => {
    const answersPromises = Array.from({ length: 3 }, () =>
      answersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-id-1') }),
      ),
    )
    await Promise.all(answersPromises)

    const result = await sut.execute({
      questionId: 'question-id-1',
      page: 1,
    })

    expect(result.value?.answers).toEqual([
      expect.objectContaining({ questionId: { value: 'question-id-1' } }),
      expect.objectContaining({ questionId: { value: 'question-id-1' } }),
      expect.objectContaining({ questionId: { value: 'question-id-1' } }),
    ])
  })

  it('should be able to fetch the answers of a question with pagination', async () => {
    const answersPromises = Array.from({ length: 30 }, () =>
      answersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-id-1') }),
      ),
    )
    await Promise.all(answersPromises)

    const resultPageOne = await sut.execute({
      questionId: 'question-id-1',
      page: 1,
    })
    const resultPageTwo = await sut.execute({
      questionId: 'question-id-1',
      page: 2,
    })

    expect(resultPageOne.value?.answers).toHaveLength(20)
    expect(resultPageTwo.value?.answers).toHaveLength(10)
    expect(resultPageOne.value?.answers).not.toEqual(
      resultPageTwo.value?.answers,
    )
  })
})
