import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { EditAnswerUseCase } from './edit-answer'

describe('Edit Answer [Use Case]', () => {
  let answersRepository: AnswersRepository
  let sut: EditAnswerUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(answersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author-id-1') },
      new UniqueEntityID('answer-id-1'),
    )

    await answersRepository.create(newAnswer)

    const { answer } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-id-1',
      content: 'New content',
    })

    expect(answer).toMatchObject({
      content: 'New content',
    })
  })

  it('should not be able to edit a answer if the author is not the same', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author-id-1') },
      new UniqueEntityID('answer-id-1'),
    )

    await answersRepository.create(newAnswer)

    const promise = sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-id-2',
      content: 'New content',
    })

    await expect(promise).rejects.toThrow(new Error('Not allowed.'))
  })
})
