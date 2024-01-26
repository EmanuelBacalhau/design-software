import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  create(data: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    params: PaginationParams,
    questionId: string,
  ): Promise<QuestionComment[]>
  delete(comment: QuestionComment): Promise<void>
}
