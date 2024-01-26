import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let questionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
// system under test

describe('Get question by slug use case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(questionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.createFromText('example-questions'),
    })

    await questionsRepository.create(newQuestion)

    const { question } = await sut.execute({ slug: 'example-questions' })

    expect(newQuestion.id).toBeTruthy()
    expect(question?.slug).toEqual(newQuestion.slug)
  })
})
