import { Entity } from '../../core/entities/entity';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { Slug } from './value-objects/slug';

interface QuestionProps {
  title: string;
  slug: Slug;
  content: string;
  authorId: UniqueEntityID;
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title;
  }

  get slug(): Slug {
    return this.props.slug;
  }

  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }
}
