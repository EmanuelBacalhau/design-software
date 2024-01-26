import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/interfaces/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  items: Question[] = []

  async create(data: Question) {
    this.items.push(data)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecents(params: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((params.page - 1) * 20, params.page * 20)

    return questions
  }

  async save(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id)

    this.items[index] = question
  }

  async delete(question: Question) {
    const itemIdenx = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIdenx, 1)
  }
}
