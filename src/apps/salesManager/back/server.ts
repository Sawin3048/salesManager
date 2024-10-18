import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import compress from 'compression'
import { registerRoutes } from './routes'
import morgan from 'morgan'
import { ErrorHandler } from './middlewares/ErrorHandler'
import { NotFound } from './middlewares/NotFound'
import { blue, green } from 'colors/safe'

export class Server {
  private readonly express: express.Express
  private readonly port
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port
    this.express = express()
    this.express.use(cors({
      credentials: true,
      origin: ['http://localhost:5173']
    }))
    this.express.use(cookieParser())
    this.express.use(express.json())
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))
    this.express.use(compress())
    this.express.use(morgan('dev'))
    const router = express.Router()
    registerRoutes(router)
    this.express.use(router)
    this.express.use(ErrorHandler)
    this.express.use(NotFound)
  }

  async listen(): Promise<void> {
    return await new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        const url = green(`http://localhost:${this.port}`)
        const mode = blue(this.express.get('env') as string)

        console.log(
          `Sale System Backend App is running on: ${url} in ${mode} mode`
        )
        console.log('Press CTRL-   to stop\n')

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
