import { ulid } from 'ulid';

export class Answer {
  public id: string;
  public content: string;

  constructor(content: string, id?: string) {
    this.id = id ?? ulid();
    this.content = content;
  }
}
