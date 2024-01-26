import { AnswersRepository } from '../repositories/interfaces/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  id: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private questionsRepository: AnswersRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.questionsRepository.findById(id)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionsRepository.delete(answer)

    return {}
  }
}
