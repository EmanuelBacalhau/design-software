import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionsRepository {
  create(data: Question): Promise<void>
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findManyRecents(params: PaginationParams): Promise<Question[]>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
