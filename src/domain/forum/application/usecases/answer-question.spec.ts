import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

describe('Answer Question [Use Case]', () => {
  let answersRepository: AnswersRepository
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(answersRepository)

    it('should create an answer', async () => {
      const { answer } = await sut.execute({
        instructorId: 'instructor-id',
        questionId: 'question-id',
        content: 'New answer',
      })

      expect(answer.content).toEqual('New answer')
    })
  })
})
