import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/interfaces/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answersId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  comments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answersCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answersId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments = await this.answersCommentsRepository.findManyByAnswerId(
      { page },
      answersId,
    )

    return {
      comments,
    }
  }
}
