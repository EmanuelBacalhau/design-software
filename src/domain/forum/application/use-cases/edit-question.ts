import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/interfaces/questions-repository'

interface EditQuestionUseCaseRequest {
  id: string
  title?: string
  content?: string
  authorId: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    id,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(id)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    question.title = title ?? question.title
    question.content = content ?? question.content

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
