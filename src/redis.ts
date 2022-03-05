import { IncomingMessage as Request } from 'http'
import { LRUResponse } from './types'
import * as Redis from 'ioredis'

export const lruSend = (redisInstance?: Redis.Redis) => {
  const cache = redisInstance || new Redis()

  return async (req: Request, res: LRUResponse, next: () => void) => {
    const key = `${req.url}.${req.headers['accepts']}.${req.headers['accept-encoding']}`

    const value = await cache.get(key)

    if (value) {
      res.send(value)
      return
    }

    const _send = res.send

    res.send = (body) => {
      cache.set(key, body as string).then((r) => {
        if (r === 'OK') {
          return _send(body)
        }
      })

      return res
    }

    next()
  }
}
