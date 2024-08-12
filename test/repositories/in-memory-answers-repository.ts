import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  private answers: Answer[] = []

  public async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }
}
