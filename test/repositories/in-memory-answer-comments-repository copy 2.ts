import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/interfaces/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  items: AnswerComment[] = []

  async create(data: AnswerComment) {
    this.items.push(data)
  }

  async findById(id: string) {
    const comment = this.items.find((item) => item.id.toString() === id)

    if (!comment) {
      return null
    }

    return comment
  }

  async findManyByAnswerId(params: PaginationParams, answerId: string) {
    return this.items
      .filter((item) => item.answerId.toString() === answerId)
      .splice((params.page - 1) * 20, params.page * 20)
  }

  async delete(comment: AnswerComment) {
    const findIndex = this.items.findIndex((item) => item.id === comment.id)

    this.items.splice(findIndex, 1)
  }
}
