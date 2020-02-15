import { EventEmitter } from 'events'
import { ClientRequest, IncomingMessage } from 'http'

declare const wget: {
  download(src: string, output: string, options?: wget.DownloadOptions): EventEmitter,
  request(options: wget.RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest,
}

declare namespace wget {
  type RequestOptions = {
    gunzip?: boolean,
  } | DownloadOptions

  type DownloadOptions = {
    protocol?: string,
    host?: string,
    path?: string,
    proxy?: {
      protocol?: string,
      host?: string,
      port?: number,
      proxyAuth?: string,
      headers?: Record<string, string>,
    } | string,
    method?: string,
  }
}

export = wget
