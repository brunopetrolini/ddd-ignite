/* eslint-disable @typescript-eslint/no-unused-vars */
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => Promise.resolve(),
}

it('should create an question', async () => {
  const sut = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await sut.execute({
    authorId: 'author-id',
    title: 'New question title',
    content: 'New question content',
  })

  expect(question.content).toEqual('New question content')
})
