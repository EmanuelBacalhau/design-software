import { describe, it, expect } from 'vitest'
import { Slug } from './slug'

describe('Slug class', () => {
  it('should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('Example Question title 3____')

    expect(slug.value).toEqual('example-question-title-3')
  })
})
