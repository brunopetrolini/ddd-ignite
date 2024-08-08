import { Entity } from '../../core/entities/entity';
import { Slug } from './value-objects/slug';

interface QuestionProps {
  title: string;
  slug: Slug;
  content: string;
  authorId: string;
}

export class Question extends Entity<QuestionProps> {
  constructor(props: QuestionProps, id?: string) {
    super(props, id);
  }

  get title(): string {
    return this.props.title;
  }

  get slug(): Slug {
    return this.props.slug;
  }

  get content(): string {
    return this.props.content;
  }

  get authorId(): string {
    return this.props.authorId;
  }
}
