import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { NotAllowedError } from './errors/not-allowed'

describe('Delete Answer Comment [Use Case]', () => {
  let answerCommentsRepository: InMemoryAnswerCommentsRepository
  let sut: DeleteAnswerCommentUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(answerCommentsRepository)
  })

  it('should be able to delete a comment', async () => {
    const comment = makeAnswerComment()
    await answerCommentsRepository.create(comment)

    await sut.execute({
      authorId: comment.authorId.toString(),
      commentId: comment.id.toString(),
    })

    expect(answerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a comment if author is not the same', async () => {
    const comment = makeAnswerComment()
    await answerCommentsRepository.create(comment)

    const result = await sut.execute({
      authorId: 'another-author-id',
      commentId: comment.id.toString(),
    })

    expect(result.isFailure()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
