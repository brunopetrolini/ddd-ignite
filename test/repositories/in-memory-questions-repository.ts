import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private questions: Question[] = []

  public async create(question: Question): Promise<void> {
    this.questions.push(question)
  }
}
