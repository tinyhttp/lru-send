# lru-send

LRU-based caching middleware for Node.js. Patches `res.send` to use LRU caching.

## Features

- 😲 [**~14x faster**](bench) for heavy operations
- ⚡ ESM-only
- ✨ types out of the box
- 🟥 (optionally) supports [Redis](http://redis.io/)

## Install

```sh
pnpm i lru-send
```

## Example

Vanilla (using `quick-lru`)

```ts
import { lruSend } from 'lru-send'
import { App } from '@tinyhttp/app'

const app = new App()

app.use(lruSend())

app.use('/', (_req, res) => {
  someUltraHeavyOp()
  res.send('hello')
})

app.listen(3000)
```

Redis

```ts
import { lruSend } from 'lru-send/redis'
import { App } from '@tinyhttp/app'
import Redis from 'ioredis'

const redis = new Redis()

const app = new App()

app.use(lruSend(redis))

app.use('/', (_req, res) => {
  someUltraHeavyOp()
  res.send('hello')
})

app.listen(3000)
```
