import express from 'express'
import helmet from 'helmet'
import http from 'http'
import compress from 'compression'
import { registerRoutes } from './routes'
import morgan from 'morgan'

export class Server {
  private readonly express: express.Express
  private readonly port
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.express = express()
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))
    this.express.use(compress())
    this.express.use(morgan('combined'))
    const router = express.Router()
    registerRoutes(router)
    this.express.use(router)
  }

  async listen(): Promise<void> {
    return await new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `Sale System Backend App is running on: http://localhost:${this.port} in ${this.express.get('env') as string} mode`
        )
        console.log('Press CTRL-C to stop\n')

        resolve()
      })
    })
  }

  getHttpServer() {
    return this.httpServer
  }

  async stop(): Promise<void> {
    return await new Promise((resolve, reject) => {
      if (this.httpServer != null) {
        this.httpServer.close(err => {
          if (err != null) {
            return reject(err)
          }
          return resolve()
        })
      }

      return resolve()
    })
  }
}
