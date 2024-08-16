import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { EditQuestionUseCase } from './edit-question'

describe('Edit Question [Use Case]', () => {
  let questionsRepository: QuestionsRepository
  let sut: EditQuestionUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(questionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-id-1') },
      new UniqueEntityID('question-id-1'),
    )

    await questionsRepository.create(newQuestion)

    const updatedQuestion = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-id-1',
      title: 'New title',
      content: 'New content',
    })

    expect(updatedQuestion.question).toMatchObject({
      title: 'New title',
      content: 'New content',
    })
  })

  it('should not be able to edit a question if the author is not the same', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-id-1') },
      new UniqueEntityID('question-id-1'),
    )

    await questionsRepository.create(newQuestion)

    const promise = sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-id-2',
      title: 'New title',
      content: 'New content',
    })

    await expect(promise).rejects.toThrow(new Error('Not allowed.'))
  })
})
