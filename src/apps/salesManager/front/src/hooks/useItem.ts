import { api } from '../api/server'

export async function getItems() {
  const res = await api.get('/item')
  return res.data
}
