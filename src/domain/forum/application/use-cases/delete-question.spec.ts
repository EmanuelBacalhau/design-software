import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let questionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
// system under test

describe('Delete question use case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionsRepository.create(newQuestion)

    await sut.execute({
      id: 'question-1',
      authorId: 'author-1',
    })

    expect(questionsRepository.items).toHaveLength(0)
  })

  it('should be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        id: 'question-1',
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
