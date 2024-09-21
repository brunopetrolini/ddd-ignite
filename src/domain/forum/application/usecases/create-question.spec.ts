import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('Create Question [Use Case]', () => {
  let questionsRepository: InMemoryQuestionsRepository
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: 'author-id',
      title: 'New question title',
      content: 'New question content',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isSuccess()).toBe(true)
    expect(questionsRepository.questions[0]).toEqual(result.value?.question)
    expect(
      questionsRepository.questions[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(questionsRepository.questions[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
