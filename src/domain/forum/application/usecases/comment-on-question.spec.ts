import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

describe('Comment on Answer [Use Case]', () => {
  let answerCommentsRepository: InMemoryAnswerCommentsRepository
  let answersRepository: InMemoryAnswersRepository
  let sut: CommentOnAnswerUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    answersRepository = new InMemoryAnswersRepository()
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Comment content',
    })

    expect(answerCommentsRepository.items[0].content).toEqual('Comment content')
  })
})
