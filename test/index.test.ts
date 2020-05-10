import * as figlet from 'figlet'
import { promisify } from 'util'
const figletPromise = promisify(figlet)
const run = async (str) => {
  const data = await figletPromise(str)
  return data
}
test('simple', async () => {
  const data = await run('Hello World')
  expect(data).toMatchSnapshot()
})
