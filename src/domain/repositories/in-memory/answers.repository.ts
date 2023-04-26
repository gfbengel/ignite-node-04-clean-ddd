import { Answer } from '@/domain/entities/answer'
import { AnswersRepository } from '../answers.repository'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}
