import { SalesManagerBackenApp } from './SalesManagerBackendApp'

try {
  void new SalesManagerBackenApp().start()
} catch (e) {
  handleError(e)
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})

function handleError(e: any) {
  console.log(e)
  process.exit(1)
}
