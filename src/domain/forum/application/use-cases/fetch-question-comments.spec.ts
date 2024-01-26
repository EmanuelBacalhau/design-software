import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository copy'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let questionsCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase
// system under test

describe('Fetch questions comments use case', () => {
  beforeEach(() => {
    questionsCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(questionsCommentsRepository)
  })

  it('should be able to fetch comments by question id', async () => {
    await questionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await questionsCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const { comments } = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(comments).toHaveLength(2)
  })

  it('should be able to fetch paginated comments by question id', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionsCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const { comments } = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(comments).toHaveLength(2)
  })
})
