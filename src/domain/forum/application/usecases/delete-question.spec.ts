import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'

describe('Delete Question [Use Case]', () => {
  let questionsRepository: InMemoryQuestionsRepository
  let sut: DeleteQuestionUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-id-1') },
      new UniqueEntityID('question-id-1'),
    )

    await questionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-id-1',
      questionId: 'question-id-1',
    })

    expect(questionsRepository.questions).toHaveLength(0)
  })

  it('should not be able to delete a question if author is not the same', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-id-1') },
      new UniqueEntityID('question-id-1'),
    )

    await questionsRepository.create(newQuestion)

    const promise = sut.execute({
      authorId: 'author-id-2',
      questionId: 'question-id-1',
    })

    await expect(promise).rejects.toThrow(new Error('Not allowed.'))
  })
})
