import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'

describe('Delete Question [Use Case]', () => {
  let questionCommentsRepository: InMemoryQuestionCommentsRepository
  let sut: DeleteQuestionCommentUseCase

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(questionCommentsRepository)
  })

  it('should be able to delete a comment', async () => {
    const comment = makeQuestionComment()
    await questionCommentsRepository.create(comment)

    await sut.execute({
      authorId: comment.authorId.toString(),
      commentId: comment.id.toString(),
    })

    expect(questionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a comment if author is not the same', async () => {
    const comment = makeQuestionComment()
    await questionCommentsRepository.create(comment)

    const promise = sut.execute({
      authorId: 'another-author-id',
      commentId: comment.id.toString(),
    })

    await expect(promise).rejects.toThrow(new Error('Not allowed.'))
  })
})
