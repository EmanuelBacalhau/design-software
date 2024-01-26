import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { FetchRecentTopicsUseCase } from './fetch-recent-topic'

let questionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentTopicsUseCase
// system under test

describe('Fetch recent topics use case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentTopicsUseCase(questionsRepository)
  })

  it('should be able to fetch recent topics', async () => {
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 22) }),
    )
    await questionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 4, 10) }),
    )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 22) }),
      expect.objectContaining({ createdAt: new Date(2023, 4, 10) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
    ])
  })

  it('should be able to fetch paginated recent topics', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionsRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(2)
  })
})
