import { Item } from '../../../Items/domain/Item'

export type SaleDataPrimitives = ReturnType<SaleItemData['toPrimitives']>
export class SaleItemData extends Item { }
