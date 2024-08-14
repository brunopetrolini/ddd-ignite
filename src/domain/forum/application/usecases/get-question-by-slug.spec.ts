import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { QuestionsRepository } from '../repositories/questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

describe('Get Question By Slug [Use Case]', () => {
  let questionsRepository: QuestionsRepository
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(questionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await questionsRepository.create(newQuestion)

    const { question } = await sut.execute({ slug: 'example-question' })

    expect(question.slug).toEqual('example-question')
  })
})
