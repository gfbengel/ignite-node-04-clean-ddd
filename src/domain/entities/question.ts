import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { Slug } from './value-objects/slug'

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId

  title: string
  content: string
  slug: Slug

  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ): Question {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id,
    )

    return question
  }

  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get authorId(): string {
    return this.props.authorId.toString()
  }
  get bestAnswerId() {
    return this.props.bestAnswerId?.toString()
  }

  get slug(): string {
    return this.props.slug.value
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, 'day') <= 3
  }

  get excerpt() {
    return this.props.content.slice(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: string | undefined) {
    this.props.bestAnswerId = new UniqueEntityId(bestAnswerId)
    this.touch()
  }
}
