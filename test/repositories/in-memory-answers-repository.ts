import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  public async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  public async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )
    this.answers.splice(answerIndex, 1)
  }

  public async update(answer: Answer): Promise<Answer> {
    const answerIndex = this.answers.findIndex(
      (item) => item.id.toString() === answer.id.toString(),
    )
    this.answers[answerIndex] = answer
    return this.answers[answerIndex]
  }

  public async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find((item) => item.id.toString() === id)
    return answer || null
  }

  public async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const itemsPerPage = 20
    const items = this.answers
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    return items
  }
}
