import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository copy 2'
import { DeleteCommnetAnswerUseCase } from './delete-comment-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let answersCommentRepository: InMemoryAnswerCommentsRepository
let sut: DeleteCommnetAnswerUseCase
// system under test

describe('Delete comment answer use case', () => {
  beforeEach(() => {
    answersCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteCommnetAnswerUseCase(answersCommentRepository)
  })

  it('should be able to delete a comment answer', async () => {
    const newCommentAnswer = makeAnswerComment()

    await answersCommentRepository.create(newCommentAnswer)

    await sut.execute({
      id: newCommentAnswer.id.toString(),
      authorId: newCommentAnswer.authorId.toString(),
    })

    expect(answersCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a commnet answer from another user', async () => {
    const newCommnetAnswer = makeAnswerComment()

    await answersCommentRepository.create(newCommnetAnswer)

    await expect(() =>
      sut.execute({
        id: newCommnetAnswer.id.toString(),
        authorId: 'author-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
