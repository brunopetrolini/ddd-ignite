import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

describe('Answer Question [Use Case]', () => {
  let answersRepository: InMemoryAnswersRepository
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(answersRepository)
  })

  it('should create an answer', async () => {
    const result = await sut.execute({
      instructorId: 'instructor-id',
      questionId: 'question-id',
      content: 'New answer',
    })

    expect(result.isSuccess()).toBe(true)
    expect(answersRepository.answers[0]).toEqual(result.value?.answer)
  })
})
