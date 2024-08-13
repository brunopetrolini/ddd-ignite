import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export const makeQuestion = (override?: Partial<QuestionProps>) => {
  return Question.create({
    authorId: new UniqueEntityID('author-id'),
    title: 'New question title',
    content: 'New question content',
    ...override,
  })
}
