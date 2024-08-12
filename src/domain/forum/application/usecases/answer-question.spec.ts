/* eslint-disable @typescript-eslint/no-unused-vars */
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => Promise.resolve(),
}

it('should create an answer', async () => {
  const sut = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await sut.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
