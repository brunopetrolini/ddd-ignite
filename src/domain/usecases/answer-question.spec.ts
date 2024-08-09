import { expect, it } from 'vitest';
import { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answer-repository';
import { AnswerQuestionUseCase } from './answer-question';

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => Promise.resolve(),
};

it('should create an answer', async () => {
  const sut = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await sut.execute({
    instructorId: new UniqueEntityID(),
    questionId: new UniqueEntityID(),
    content: 'New answer',
  });

  expect(answer.content).toEqual('New answer');
});
