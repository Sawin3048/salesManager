import { Sale } from './Sale'
// import { SaleItem } from './SaleItem2'
// import { SaleItemId } from './SaleItem/SaleItemId'

export interface SaleRepository {
  save: (sale: Sale) => Promise<void>
  searchAll: () => Promise<Sale[]>
  // findItems: (ids: SaleItemId[]) => Promise<Array<SaleItem['data']>>
}
