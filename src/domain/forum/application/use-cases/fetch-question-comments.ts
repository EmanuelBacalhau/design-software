import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/interfaces/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  comments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(
    private questionsCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionsCommentsRepository.findManyByQuestionId(
        { page },
        questionId,
      )

    return {
      comments,
    }
  }
}
