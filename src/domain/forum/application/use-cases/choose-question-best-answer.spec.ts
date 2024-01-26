import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let questionsRepository: InMemoryQuestionsRepository
let answersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase
// system under test

describe('Choose question best answer use case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      answersRepository,
      questionsRepository,
    )
  })

  it('should be able to choose the question  best answer', async () => {
    const newQuestion = makeQuestion()

    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await questionsRepository.create(newQuestion)
    await answersRepository.create(newAnswer)

    const { question } = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(question).toMatchObject({
      bestAnswerId: newAnswer.id,
    })
  })

  it('should not be able to choose another user question best answer', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await questionsRepository.create(newQuestion)
    await answersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
