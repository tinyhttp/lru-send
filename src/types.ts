import { ServerResponse as Response } from 'http'

export interface LRUResponse extends Response {
  send(body: unknown): LRUResponse
}
