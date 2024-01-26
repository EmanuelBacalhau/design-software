import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository copy 2'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let answersRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase
// system under test

describe('Fetch comments answers use case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(answersRepository)
  })

  it('should be able to fetch comments by answer id', async () => {
    await answersRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-id'),
      }),
    )
    await answersRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-id'),
      }),
    )
    await answersRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-id'),
      }),
    )

    const { comments } = await sut.execute({
      page: 1,
      answersId: 'answer-id',
    })

    expect(comments).toHaveLength(3)
  })

  it('should be able to fetch paginated comments by answer id', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-id'),
        }),
      )
    }

    const { comments } = await sut.execute({
      page: 2,
      answersId: 'answer-id',
    })

    expect(comments).toHaveLength(2)
  })
})
