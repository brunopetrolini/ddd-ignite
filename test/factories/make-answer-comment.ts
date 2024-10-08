import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'

export const makeAnswerComment = (
  override?: Partial<AnswerCommentProps>,
  id?: UniqueEntityID,
) => {
  return AnswerComment.create(
    {
      authorId: new UniqueEntityID('author-id'),
      answerId: new UniqueEntityID('answer-id'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
