import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository copy 2'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { ConmentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'

let answerRepository: InMemoryAnswersRepository
let answerCommnetRepository: InMemoryAnswerCommentsRepository
let sut: ConmentOnAnswerUseCase
// system under test

describe('Comment on answer use case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    answerCommnetRepository = new InMemoryAnswerCommentsRepository()
    sut = new ConmentOnAnswerUseCase(answerRepository, answerCommnetRepository)
  })

  it('should be able to create a answer comment', async () => {
    const answer = makeAnswer()

    await answerRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'New comment',
    })

    expect(answerCommnetRepository.items[0].content).toEqual('New comment')
  })
})
