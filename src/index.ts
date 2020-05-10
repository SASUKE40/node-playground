import * as figlet from 'figlet'
import { promisify } from 'util'
const figletPromise = promisify(figlet)
const run = async () => {
  const data = await figletPromise('Hello World')
  console.log(data)
}
run()
