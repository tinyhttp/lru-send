import { App } from '@tinyhttp/app'
import { randomFillSync } from 'crypto'

const app = new App()

app.use('/', (_req, res) => {
  const buf = Buffer.alloc(1000000)

  const newBuf = randomFillSync(buf, 0, 1000000).toString('utf-8')
  res.send('hello')
})

app.listen(3000)
