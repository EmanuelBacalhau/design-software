import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/interfaces/questions-repository'

interface FetchRecentTopicsUseCaseRequest {
  page: number
}

interface FetchRecentTopicsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentTopicsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentTopicsUseCaseRequest): Promise<FetchRecentTopicsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecents({ page })

    return {
      questions,
    }
  }
}
