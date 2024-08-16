import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerInput {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerOutput {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  public async execute(input: EditAnswerInput): Promise<EditAnswerOutput> {
    const { authorId, answerId, content } = input
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    const updatedAnswer = await this.answersRepository.update(answer)
    return { answer: updatedAnswer }
  }
}
