import { QuestionCommentsRepository } from '../repositories/interfaces/question-comments-repository'

interface DeleteCommnetQuestionUseCaseRequest {
  id: string
  authorId: string
}

interface DeleteCommnetQuestionUseCaseResponse {}

export class DeleteCommnetQuestionUseCase {
  constructor(
    private questionsCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    id,
    authorId,
  }: DeleteCommnetQuestionUseCaseRequest): Promise<DeleteCommnetQuestionUseCaseResponse> {
    const comment = await this.questionsCommentsRepository.findById(id)

    if (!comment) {
      throw new Error('CommnetQuestion not found')
    }

    if (authorId !== comment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionsCommentsRepository.delete(comment)

    return {}
  }
}
