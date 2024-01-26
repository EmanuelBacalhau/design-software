import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/interfaces/answers-repository'

interface EditAnswerUseCaseRequest {
  id: string
  authorId: string
  content?: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    id,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(id)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content ?? answer.content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
