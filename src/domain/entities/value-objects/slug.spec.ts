import { Slug } from './slug'

describe('value objects | slug', () => {
  beforeEach(() => {})

  it('should be able to create a new slug from text', async () => {
    const slug = Slug.createFromText('Example Title')

    expect(slug.value).toEqual('example-title')
  })
})
