import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Question } from '../../enterprise/entities/question'
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
    const newQuestions = Question.create({
      authorId: new UniqueEntityID('author-id'),
      title: 'New question title',
      content: 'New question content',
    })

    await questionsRepository.create(newQuestions)

    const { question } = await sut.execute({ slug: 'new-question-title' })

    expect(question.content).toEqual('New question content')
  })
})
