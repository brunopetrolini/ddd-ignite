import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionInput {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionOutput {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  public async execute(input: EditQuestionInput): Promise<EditQuestionOutput> {
    const { authorId, questionId, title, content } = input
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    const updatedQuestion = await this.questionsRepository.update(question)
    return { question: updatedQuestion }
  }
}
