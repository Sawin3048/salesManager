// import jwt, { JsonWebTokenError } from 'jsonwebtoken'
// const secret = 'alksjdlfjaslkdfj'
// const t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFsZ3VuUmFuZG9tSWQiLCJyb2xlIjoiY2F0IiwiaWF0IjoxNzIyOTUxODc3LCJleHAiOjE3MjMxMjQ2Nzd9.L0-N0YImH01SICoV-r2ze3cuopiMSWSuzsm5X-lcWlM'
// const token = jwt.sign({ id: 'AlgunRandomId', role: 'cat' }, secret, {
//   expiresIn: '2d'
// })
// console.log({ token })
// try {
//   const payload = jwt.decode(t)
//   console.log({ payload })
// } catch (error) {
//   console.log(error instanceof JsonWebTokenError)

import Joi from 'joi'

// }
const shema = Joi.date().exist()
const d = new Date('2024-0sdf8-14T19:12:39.568Z')
console.log({ d })
const r = shema.validate(d)
console.log(r)
const date = r.value as Date
console.log(date.toLocaleString())
