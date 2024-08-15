import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerInput {
  authorId: string
  answerId: string
}

type DeleteAnswerOutput = void

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  public async execute({
    authorId,
    answerId,
  }: DeleteAnswerInput): Promise<DeleteAnswerOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)
  }
}
