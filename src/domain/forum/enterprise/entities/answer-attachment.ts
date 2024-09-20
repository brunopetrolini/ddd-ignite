import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AnswerAttachmentProps {
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    const questionAttachment = new AnswerAttachment(props, id)
    return questionAttachment
  }

  get questionId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }
}
