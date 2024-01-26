import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository copy'
import { DeleteCommnetQuestionUseCase } from './delete-comment-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let questionCommentRepository: InMemoryQuestionCommentsRepository
let sut: DeleteCommnetQuestionUseCase
// system under test

describe('Delete comment question use case', () => {
  beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteCommnetQuestionUseCase(questionCommentRepository)
  })

  it('should be able to delete a comment question', async () => {
    const newCommentQuestion = makeQuestionComment()

    await questionCommentRepository.create(newCommentQuestion)

    await sut.execute({
      id: newCommentQuestion.id.toString(),
      authorId: newCommentQuestion.authorId.toString(),
    })

    expect(questionCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a commnet question from another user', async () => {
    const newCommnetQuestion = makeQuestionComment()

    await questionCommentRepository.create(newCommnetQuestion)

    await expect(() =>
      sut.execute({
        id: newCommnetQuestion.id.toString(),
        authorId: 'author-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
