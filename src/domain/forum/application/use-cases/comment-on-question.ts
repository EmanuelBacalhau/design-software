import { QuestionsRepository } from '../repositories/interfaces/questions-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionCommentsRepository } from '../repositories/interfaces/question-comments-repository'

interface ConmentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface ConmentOnQuestionUseCaseResponse {
  comment: QuestionComment
}

export class ConmentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: ConmentOnQuestionUseCaseRequest): Promise<ConmentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const comment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(comment)

    return {
      comment,
    }
  }
}
