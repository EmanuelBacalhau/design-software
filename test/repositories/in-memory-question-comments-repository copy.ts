import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/interfaces/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  items: QuestionComment[] = []

  async create(data: QuestionComment) {
    this.items.push(data)
  }

  async findById(id: string) {
    const comment = this.items.find((item) => item.id.toString() === id)

    if (!comment) {
      return null
    }

    return comment
  }

  async findManyByQuestionId(params: PaginationParams, questionId: string) {
    const comments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((params.page - 1) * 20, params.page * 20)

    return comments
  }

  async delete(comment: QuestionComment) {
    const findIndex = this.items.findIndex((item) => comment.id === item.id)

    this.items.splice(findIndex, 1)
  }
}
