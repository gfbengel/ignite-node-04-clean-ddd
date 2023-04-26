import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface AnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId

  content: string

  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityId,
  ): Answer {
    const answer = new Answer({ ...props, createdAt: new Date() }, id)

    return answer
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId.toString()
  }

  get questionId() {
    return this.props.questionId.toString()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.props.content.slice(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
