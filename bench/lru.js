import { lruSend } from '../dist/index.js'
import { App } from '@tinyhttp/app'
import { randomFillSync } from 'crypto'

const app = new App()

app.use(lruSend())

app.use('/', (_req, res) => {
  const buf = Buffer.alloc(1000000)

  randomFillSync(buf, 0, 1000000).toString('utf-8')
  res.send('hello')
})

app.listen(3000)
