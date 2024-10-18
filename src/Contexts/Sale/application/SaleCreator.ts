import { SaleRepository } from '../domain/SaleRepository'
import { ItemRepository } from '../../Items/domain/ItemRepository'
import { ItemId } from '../../Items/domain/ItemId'
import { DomainError } from '../../Shared/domain/DomainError'
import { SaleItem } from '../domain/SaleItem'
import { Item } from '../../Items/domain/Item'
import { SaleItemAmount } from '../domain/SaleItem/SaleItemAmount'
import { Sale } from '../domain/Sale'
import { SaleId } from '../domain/SaleId'
import { SaleCreatedAt } from '../domain/SaleCreatedAt'

interface CreatorItemParam {
  id: string
  amount: string
}

export interface SaleCreatorParams {
  id: string
  items: CreatorItemParam[]
}

export class SalesCreator {
  readonly saleRepository
  readonly itemRepository
  constructor(dependencies: { saleRepository: SaleRepository, itemRepository: ItemRepository }) {
    this.saleRepository = dependencies.saleRepository
    this.itemRepository = dependencies.itemRepository
  }

  async run(params: SaleCreatorParams) {
    const items = await this.getItems(params.items)

    const sale = new Sale({
      id: new SaleId(params.id),
      createdAt: new SaleCreatedAt(new Date()),
      items
    })

    return await this.saleRepository.save(sale)
  }

  private async getItem(id: string) {
    return await this.itemRepository.searchById(new ItemId(id))
  }

  private async getItems(items: CreatorItemParam[]) {
    const map = new Map<string, CreatorItemParam>(items.map(i => [i.id, i]))

    const promises = items.map(async item => await this.getItem(item.id))
    const resolvedItems = await Promise.all(promises) as Item[]

    if (!resolvedItems.every(item => item)) {
      throw new DomainError('One or more items not found')
    }

    const saleItems = resolvedItems.map(item => {
      const amount = map.get(item.id.value)?.amount

      return new SaleItem({
        data: item,
        amount: new SaleItemAmount(Number(amount))
      })
    })

    return saleItems
  }
}
