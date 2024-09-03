import { Either, failure, success } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface EditQuestionInput {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute(input: EditQuestionInput): Promise<EditQuestionOutput> {
    const { authorId, questionId, title, content } = input
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    question.title = title
    question.content = content

    const updatedQuestion = await this.questionsRepository.update(question)
    return success({ question: updatedQuestion })
  }
}
