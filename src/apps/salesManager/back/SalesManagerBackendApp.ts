import { Server } from './server'

export class SalesManagerBackenApp {
  server?: Server

  async start() {
    const port = process.env.PORT ?? '3000'
    this.server = new Server(port)
    return await this.server.listen()
  }

  httpServer() {
    return this.server?.getHttpServer()
  }

  async stop() {
    return await this.server?.stop()
  }
}
