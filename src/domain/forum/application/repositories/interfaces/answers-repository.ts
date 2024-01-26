import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnswersRepository {
  create(data: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    params: PaginationParams,
    questionIds: string,
  ): Promise<Answer[]>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
