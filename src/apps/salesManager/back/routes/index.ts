import { Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'
import colors from 'colors/safe'

const filesNames = readdirSync(__dirname)

export function registerRoutes(app: Router) {
  for (const fileName of filesNames) {
    const cleanName = cleanFileName(fileName)

    if (cleanName === null) continue

    const packageRoute = path.join(__dirname, `./${cleanName}.route`)

    import(packageRoute).then(
      r => {
        const register = r.register
        register(app)
        console.log('The route has been loaded:', colors.yellow(` /${cleanName}`))
      }
    )
      .catch(_err => {
        console.log('Error on load route: ', colors.red('/' + cleanName))
        if (_err instanceof Error) console.log(_err)
      })
  }
}

function cleanFileName(fileName: string) {
  const isRoute = fileName.includes('.route')
  if (!isRoute) return null
  const file = fileName.split('.route').shift()
  return file as string
}

// export const router = Router()

// for (const fileName of filesNames) {
//   const cleanName = cleanFileName(fileName)

//   if (cleanName !== 'index') {
//     const packageRoute = path.join(__dirname, `./${cleanName}`)

//     import(packageRoute).then(
//       r => {
//         const importedRouter = r.route
//         router.use(`/${cleanName}`, importedRouter as Router)
//         console.log('The route has been loaded:', colors.yellow(` /${cleanName}`))
//       }
//     )
//       .catch(_err => {
//         console.log('Error on load route: ', colors.red('/' + cleanName))
//         // if (err instanceof Error) console.log(err.message)
//       })
//   }
// }
