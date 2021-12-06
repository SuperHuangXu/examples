const { baidu, newDate } = require('../dist/index.common.js')

test('test baidu', async () => {
  const body = await baidu()
  expect(body).toContain('<html>')
})

test('test newDate', () => {
  expect(newDate().toString()).toHaveLength(13)
})
