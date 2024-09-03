import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { NotAllowedError } from './errors/not-allowed'

describe('Delete Answer [Use Case]', () => {
  let answersRepository: InMemoryAnswersRepository
  let sut: DeleteAnswerUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(answersRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author-id-1') },
      new UniqueEntityID('answer-id-1'),
    )

    await answersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-id-1',
      answerId: 'answer-id-1',
    })

    expect(answersRepository.answers).toHaveLength(0)
  })

  it('should not be able to delete a answer if author is not the same', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author-id-1') },
      new UniqueEntityID('answer-id-1'),
    )

    await answersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-id-2',
      answerId: 'answer-id-1',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
