import { expect, it } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';

it('should create an answer', () => {
  const sut = new AnswerQuestionUseCase();

  const answer = sut.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'New answer',
  });

  expect(answer.content).toEqual('New answer');
});
