const { getCurrentPage } = require('./../public/js/chriscorchado')

describe('getCurrentPage', () => {
  it('returns about', () => {
    expect(getCurrentPage()).toBe('about')
  })
})
