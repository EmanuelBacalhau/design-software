import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ConmentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository copy'
import { makeQuestion } from 'test/factories/make-questions'

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let questionRepository: InMemoryQuestionsRepository
let sut: ConmentOnQuestionUseCase
// system under test

describe('Comment on question use case', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    questionRepository = new InMemoryQuestionsRepository()
    sut = new ConmentOnQuestionUseCase(
      questionRepository,
      questionCommentsRepository,
    )
  })

  it('should be able to create a question comment', async () => {
    const question = makeQuestion()

    await questionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'New comment',
    })

    expect(questionCommentsRepository.items[0].content).toEqual('New comment')
  })
})
