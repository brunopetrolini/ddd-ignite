import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  public async create(question: Question): Promise<void> {
    this.questions.push(question)
  }

  public async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (item) => item.id === question.id,
    )

    if (questionIndex === -1) {
      throw new Error('Question not found.')
    }

    this.questions.splice(questionIndex, 1)
  }

  public async update(question: Question): Promise<Question> {
    const questionIndex = this.questions.findIndex(
      (item) => item.id === question.id,
    )

    this.questions[questionIndex] = question
    return this.questions[questionIndex]
  }

  public async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find((question) => question.slug === slug)
    return question || null
  }

  public async findById(id: string): Promise<Question | null> {
    const question = this.questions.find((item) => item.id.toString() === id)
    return question || null
  }

  public async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const itemsPerPage = 20
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    return questions
  }
}
