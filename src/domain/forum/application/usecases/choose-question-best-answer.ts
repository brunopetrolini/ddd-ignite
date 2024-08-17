import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerInput {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerOutput = void

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  public async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerInput): Promise<ChooseQuestionBestAnswerOutput> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const questionId = answer.questionId.toString()
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id
    await this.questionsRepository.update(question)
  }
}
