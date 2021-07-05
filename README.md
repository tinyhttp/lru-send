<div align="center">

# lru-send

[![npm][npm-img]][npm-url] [![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tinyhttp/tinyhttp/CI?style=for-the-badge&logo=github&label=&color=9F5E8C)][github-actions] [![Coverage][cov-img]][cov-url]

</div>

LRU-based caching middleware for Node.js that patches `res.send`.

## Features

- 😲 [**~336x faster**](bench) for heavy operations
- ⚡ ESM-only
- ✨ types out of the box
- 🟥 (optionally) supports [Redis](http://redis.io/)

## Install

```sh
pnpm i lru-send
```

## Examples

### In-memory

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

### Redis

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

[npm-url]: https://npmjs.com/package/lru-send
[github-actions]: https://github.com/tinyhttp/lru-send/actions
[cov-img]: https://img.shields.io/coveralls/github/tinyhttp/lru-send?style=for-the-badge&color=9F5E8C
[cov-url]: https://coveralls.io/github/tinyhttp/lru-send
[npm-img]: https://img.shields.io/npm/dt/lru-send?style=for-the-badge&color=9F5E8C
