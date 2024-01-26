import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { FetchQuestionAnswerUseCase } from './fetch-question-answers'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let answersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswerUseCase
// system under test

describe('Fetch questios answers use case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswerUseCase(answersRepository)
  })

  it('should be able to fetch answers by question id', async () => {
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-01'),
      }),
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-01'),
      }),
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-01'),
      }),
    )

    const { answers } = await sut.execute({
      page: 1,
      questionId: 'question-01',
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated answers by question id', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('question-01'),
        }),
      )
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: 'question-01',
    })

    expect(answers).toHaveLength(2)
  })
})
