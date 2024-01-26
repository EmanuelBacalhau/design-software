import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'

let answersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase
// system under test

describe('Edit answer use case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(answersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )

    await answersRepository.create(newAnswer)

    await sut.execute({
      id: 'answer-1',
      authorId: 'author-1',
      content: 'update question',
    })

    expect(answersRepository.items).toHaveLength(1)
    expect(answersRepository.items[0]).toMatchObject({
      content: 'update question',
    })
  })

  it('should be able to edit a question from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )

    await answersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        id: 'answer-1',
        authorId: 'author-2',
        content: 'update question',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
