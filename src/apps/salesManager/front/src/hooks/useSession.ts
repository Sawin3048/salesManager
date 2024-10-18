import { api } from '../api/server'

interface SessionParams {
  cin: string
  password: string
}

export async function singIn(params: SessionParams) {
  const res = await api.post('/api/signin', params)
  return res.data
}
