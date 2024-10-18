import { Nullable } from '../../../../tests/Contexts/Shared/domain/Nullable'
import { Item } from './Item'
import { ItemCode } from './ItemCode'
import { ItemId } from './ItemId'

export interface ItemRepository {
  save: (item: Item) => Promise<void>
  searchAll: () => Promise<Item[]>
  searchByCode: (code: ItemCode) => Promise<Nullable<Item>>
  searchById: (id: ItemId) => Promise<Nullable<Item>>
}
