import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export const makeQuestion = (
  override?: Partial<QuestionProps>,
  id?: UniqueEntityID,
) => {
  return Question.create(
    {
      authorId: new UniqueEntityID('author-id'),
      title: faker.lorem.sentences(3),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
