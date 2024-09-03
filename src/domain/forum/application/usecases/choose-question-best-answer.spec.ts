import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { NotAllowedError } from './errors/not-allowed'

describe('Choose Question Best Answer [Use Case]', () => {
  let answersRepository: InMemoryAnswersRepository
  let questionsRepository: InMemoryQuestionsRepository
  let sut: ChooseQuestionBestAnswerUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      answersRepository,
      questionsRepository,
    )
  })

  it('should be able to choose the best answer for a question', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await questionsRepository.create(question)
    await answersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(questionsRepository.questions[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose the best answer if the user is not the author of the question', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await questionsRepository.create(question)
    await answersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'another-author-id',
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
