import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'

let answersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase
// system under test

describe('Answer question use case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(answersRepository)
  })

  it('should be able to create a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-01'),
      },
      new UniqueEntityId('answer-01'),
    )

    await answersRepository.create(newAnswer)

    await sut.execute({
      id: 'answer-01',
      authorId: 'author-01',
    })
  })

  it('should be able to delete a answer from another user', async () => {
    const newQuestion = makeAnswer()

    await answersRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        id: 'question-1',
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
