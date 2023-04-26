import { Answer } from '../entities/answer'
import { InMemoryAnswersRepository } from '../repositories/in-memory/answers.repository'
import { AnswerQuestionUseCase } from './answer-question.use-case'

let answersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(answersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: 'any-instructor-id',
      questionId: 'any-question-id',
      content: 'any-content',
    })

    expect(answer).toBeInstanceOf(Answer)
    expect(answer.content).toBe('any-content')

    expect(answersRepository.items).toHaveLength(1)
  })
})
