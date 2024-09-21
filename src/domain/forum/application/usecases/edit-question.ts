import { Either, failure, success } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-respository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditQuestionInput {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionOutput = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  public async execute(input: EditQuestionInput): Promise<EditQuestionOutput> {
    const { authorId, questionId, title, content } = input
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return failure(new NotAllowedError())
    }

    const currentAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentsList = new QuestionAttachmentList(
      currentAttachments,
    )

    const questionAttachments = input.attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentsList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentsList

    const updatedQuestion = await this.questionsRepository.update(question)
    return success({ question: updatedQuestion })
  }
}
