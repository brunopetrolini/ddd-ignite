import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseInput {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseOutput {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute(
    input: CreateQuestionUseCaseInput,
  ): Promise<CreateQuestionUseCaseOutput> {
    const question = Question.create({
      authorId: new UniqueEntityID(input.authorId),
      title: input.title,
      content: input.content,
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
