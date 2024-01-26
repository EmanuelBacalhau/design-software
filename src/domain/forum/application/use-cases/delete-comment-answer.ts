import { AnswerCommentsRepository } from '../repositories/interfaces/answer-comments-repository'

interface DeleteCommnetAnswerUseCaseRequest {
  id: string
  authorId: string
}

interface DeleteCommnetAnswerUseCaseResponse {}

export class DeleteCommnetAnswerUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteCommnetAnswerUseCaseRequest): Promise<DeleteCommnetAnswerUseCaseResponse> {
    const comment = await this.answerCommentRepository.findById(id)

    if (!comment) {
      throw new Error('CommnetAnswer not found')
    }

    if (authorId !== comment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answerCommentRepository.delete(comment)

    return {}
  }
}
