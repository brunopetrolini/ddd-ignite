import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

describe('Fetch Answer Comments [Use Case]', () => {
  let answerCommentsRepository: InMemoryAnswerCommentsRepository
  let sut: FetchAnswerCommentsUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(answerCommentsRepository)
  })

  it('should be able to fetch the comments of a answer', async () => {
    const commentsPromises = Array.from({ length: 3 }, () =>
      answerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-id-1'),
        }),
      ),
    )
    await Promise.all(commentsPromises)

    const result = await sut.execute({
      answerId: 'answer-id-1',
      page: 1,
    })

    expect(result.value?.comments).toEqual([
      expect.objectContaining({ answerId: { value: 'answer-id-1' } }),
      expect.objectContaining({ answerId: { value: 'answer-id-1' } }),
      expect.objectContaining({ answerId: { value: 'answer-id-1' } }),
    ])
  })

  it('should be able to fetch the comments of a answer with pagination', async () => {
    const commentsPromises = Array.from({ length: 30 }, () =>
      answerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-id-1'),
        }),
      ),
    )
    await Promise.all(commentsPromises)

    const resultPageOne = await sut.execute({
      answerId: 'answer-id-1',
      page: 1,
    })
    const resultPageTwo = await sut.execute({
      answerId: 'answer-id-1',
      page: 2,
    })

    expect(resultPageOne.value?.comments).toHaveLength(20)
    expect(resultPageTwo.value?.comments).toHaveLength(10)
    expect(resultPageOne.value?.comments).not.toEqual(
      resultPageTwo.value?.comments,
    )
  })
})
