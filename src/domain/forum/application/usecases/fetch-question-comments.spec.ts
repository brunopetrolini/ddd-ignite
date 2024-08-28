import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

describe('Fetch Question Comments [Use Case]', () => {
  let questionCommentsRepository: InMemoryQuestionCommentsRepository
  let sut: FetchQuestionCommentsUseCase

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(questionCommentsRepository)
  })

  it('should be able to fetch the comments of a question', async () => {
    const commentsPromises = Array.from({ length: 3 }, () =>
      questionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-id-1'),
        }),
      ),
    )
    await Promise.all(commentsPromises)

    const { comments } = await sut.execute({
      questionId: 'question-id-1',
      page: 1,
    })

    expect(comments).toEqual([
      expect.objectContaining({ questionId: { value: 'question-id-1' } }),
      expect.objectContaining({ questionId: { value: 'question-id-1' } }),
      expect.objectContaining({ questionId: { value: 'question-id-1' } }),
    ])
  })

  it('should be able to fetch the comments of a question with pagination', async () => {
    const commentsPromises = Array.from({ length: 30 }, () =>
      questionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-id-1'),
        }),
      ),
    )
    await Promise.all(commentsPromises)

    const { comments: commentsPageOne } = await sut.execute({
      questionId: 'question-id-1',
      page: 1,
    })
    const { comments: commentsPageTwo } = await sut.execute({
      questionId: 'question-id-1',
      page: 2,
    })

    expect(commentsPageOne).toHaveLength(20)
    expect(commentsPageTwo).toHaveLength(10)
    expect(commentsPageOne).not.toEqual(commentsPageTwo)
  })
})
