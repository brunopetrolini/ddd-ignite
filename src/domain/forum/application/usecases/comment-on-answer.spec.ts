import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

describe('Comment on Question [Use Case]', () => {
  let questionCommentsRepository: InMemoryQuestionCommentsRepository
  let questionsRepository: InMemoryQuestionsRepository
  let sut: CommentOnQuestionUseCase

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      questionsRepository,
      questionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await questionsRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Comment content',
    })

    expect(questionCommentsRepository.items[0].content).toEqual(
      'Comment content',
    )
  })
})
