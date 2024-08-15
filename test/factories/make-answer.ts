import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

export const makeAnswer = (
  override?: Partial<AnswerProps>,
  id?: UniqueEntityID,
) => {
  return Answer.create(
    {
      authorId: new UniqueEntityID('author-id'),
      questionId: new UniqueEntityID('question-id'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
