import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  create(comment: QuestionComment): Promise<void>
  delete(comment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
}
