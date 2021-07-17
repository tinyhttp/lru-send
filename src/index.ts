import { IncomingMessage as Request } from 'http'
import { LRUResponse } from './types'
import LRU from 'quick-lru'

export const lruSend = (lruInstance?: LRU<string, unknown>) => {
  const cache = lruInstance || new LRU({ maxSize: 1000, maxAge: 1000 * 60 })
  return (req: Request, res: LRUResponse, next: () => void) => {
    if (req.method === 'GET') {
      const key = `${req.url}.${req.headers['accepts']}.${req.headers['accept-encoding']}`

      const value = cache.get(key)

      if (value) {
        res.send(value)
        return
      }

      const _send = res.send

      res.send = (body) => {
        cache.set(key, body)
        return _send(body)
      }
    }

    next()
  }
}
