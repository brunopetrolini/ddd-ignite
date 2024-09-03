import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

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
    })

    expect(result.isSuccess()).toBe(true)
    expect(questionsRepository.questions[0]).toEqual(result.value?.question)
  })
})
