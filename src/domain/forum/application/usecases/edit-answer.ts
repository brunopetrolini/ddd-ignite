import { Either, failure, success } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface EditAnswerInput {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  public async execute(input: EditAnswerInput): Promise<EditAnswerOutput> {
    const { authorId, answerId, content } = input
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return failure(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    answer.content = content

    const updatedAnswer = await this.answersRepository.update(answer)
    return success({ answer: updatedAnswer })
  }
}
