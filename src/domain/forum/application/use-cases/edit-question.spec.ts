import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let questionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase
// system under test

describe('Edit question use case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(questionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionsRepository.create(newQuestion)

    await sut.execute({
      id: 'question-1',
      authorId: 'author-1',
      title: 'Update',
      content: 'update question',
    })

    expect(questionsRepository.items).toHaveLength(1)
    expect(questionsRepository.items[0]).toMatchObject({
      title: 'Update',
      content: 'update question',
    })
  })

  it('should be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await questionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        id: 'question-1',
        authorId: 'author-2',
        title: 'Update',
        content: 'update question',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
