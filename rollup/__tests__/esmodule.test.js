import { baidu, newDate } from '../dist/index.module.js'

test('test baidu', async () => {
  const body = await baidu()
  expect(body).toContain('<html>')
})

test('test newDate', () => {
  expect(newDate().toString()).toHaveLength(13)
})
