import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerCommentsRepository } from '../repositories/interfaces/answer-comments-repository'
import { AnswersRepository } from '../repositories/interfaces/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

interface ConmentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface ConmentOnAnswerUseCaseResponse {
  comment: AnswerComment
}

export class ConmentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: ConmentOnAnswerUseCaseRequest): Promise<ConmentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const comment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepository.create(comment)

    return {
      comment,
    }
  }
}
