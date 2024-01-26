import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/interfaces/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  items: Answer[] = []

  async create(data: Answer) {
    this.items.push(data)
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(params: PaginationParams, questionId: string) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((params.page - 1) * 20, params.page * 20)

    return answers
  }

  async save(answer: Answer) {
    const findIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[findIndex] = answer
  }

  async delete(answer: Answer) {
    const findIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(findIndex, 1)
  }
}
