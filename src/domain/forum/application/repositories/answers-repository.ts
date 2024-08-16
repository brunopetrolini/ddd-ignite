import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  update(answer: Answer): Promise<Answer>
  findById(id: string): Promise<Answer | null>
}
