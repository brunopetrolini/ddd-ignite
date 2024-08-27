import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  public async create(comment: QuestionComment): Promise<void> {
    this.items.push(comment)
  }

  public async delete(comment: QuestionComment): Promise<void> {
    const commentIndex = this.items.findIndex((item) => item.id === comment.id)

    if (commentIndex === -1) {
      throw new Error('Comment not found.')
    }

    this.items.splice(commentIndex, 1)
  }

  public async findById(id: string): Promise<QuestionComment | null> {
    const comment = this.items.find((item) => item.id.toString() === id)
    return comment || null
  }
}
