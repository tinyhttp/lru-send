import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { App } from '@tinyhttp/app'
import { makeFetch } from 'supertest-fetch'
import { lruSend } from '../src/index'
import LRU from 'quick-lru'

const t = suite('Vanilla (quick-lru)')

t('should work with custom LRU instance', async () => {
  const app = new App()
  const lru = new LRU<string, unknown>({ maxSize: 5 })
  app.use(lruSend(lru))

  let r = false

  app.use((_req, res) => {
    if (r) {
      assert.type(lru.values()[0], 'string')
      assert.equal(lru.size, 1)
    }
    r = true
    res.send('hello')
  })
  const server = app.listen()
  const fetch = makeFetch(server)

  await fetch('/')
})

t('should only cache GET requests', async () => {
  const app = new App()
  const lru = new LRU<string, unknown>({ maxSize: 2 })
  app.use(lruSend(lru))

  app.use((_req, res) => {
    assert.equal(lru.size, 0)
    res.send('hello')
  })
  const server = app.listen()
  const fetch = makeFetch(server)

  await fetch('/', { method: 'POST' })
})

t.run()
