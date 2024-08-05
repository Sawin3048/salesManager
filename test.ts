import jwt from 'jsonwebtoken'
const secret = 'alksjdlfjaslkdfj'
const t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFsZ3VuUmFuZG9tSWQiLCJyb2xlIjoiY2F0IiwiaWF0IjoxNzIyODI3MTg3LCJleHAiOjE3MjI5OTk5ODd9.vOrvAgZDBptTphlu6-77PVJNrU9z0PKWLCwPZgb0hIw'
const token = jwt.sign({ id: 'AlgunRandomId', role: 'cat' }, secret, {
  expiresIn: '2d'
})
console.log(jwt.verify(t, secret))
console.log(token)
