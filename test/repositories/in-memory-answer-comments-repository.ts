import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  public async create(comment: AnswerComment): Promise<void> {
    this.items.push(comment)
  }

  public async delete(comment: AnswerComment): Promise<void> {
    const commentIndex = this.items.findIndex((item) => item.id === comment.id)

    if (commentIndex === -1) {
      throw new Error('Comment not found.')
    }

    this.items.splice(commentIndex, 1)
  }

  public async findById(id: string): Promise<AnswerComment | null> {
    const comment = this.items.find((item) => item.id.toString() === id)
    return comment || null
  }
}
