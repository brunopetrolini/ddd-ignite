import { Answer } from '../entities/answer';

export namespace AnswerQuestionUseCase {
  export interface Input {
    instructorId: string;
    questionId: string;
    content: string;
  }

  export type Output = Answer;
}

export class AnswerQuestionUseCase {
  public execute(input: AnswerQuestionUseCase.Input): AnswerQuestionUseCase.Output {
    const answer = new Answer(input.content);
    return answer;
  }
}
