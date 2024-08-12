/* eslint-disable @typescript-eslint/no-unused-vars */

import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

describe('Create Question [Use Case]', () => {
  let questionsRepository: QuestionsRepository
  let sut: CreateQuestionUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: 'author-id',
      title: 'New question title',
      content: 'New question content',
    })

    expect(question.content).toEqual('New question content')
  })
})
