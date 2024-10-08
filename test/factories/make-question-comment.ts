import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment'

export const makeQuestionComment = (
  override?: Partial<QuestionCommentProps>,
  id?: UniqueEntityID,
) => {
  return QuestionComment.create(
    {
      authorId: new UniqueEntityID('author-id'),
      questionId: new UniqueEntityID('question-id'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
