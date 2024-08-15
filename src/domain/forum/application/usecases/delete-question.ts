import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionInput {
  authorId: string
  questionId: string
}

type DeleteQuestionOutput = void

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute({
    authorId,
    questionId,
  }: DeleteQuestionInput): Promise<DeleteQuestionOutput> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)
  }
}
