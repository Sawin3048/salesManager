import { Filter } from './Filter'

export class Filters {
  readonly filters: Filter[]

  constructor(filters: Filter[]) {
    this.filters = filters
  }

  static fromValues(filters: Array<Map<string, string>>) {
    return new Filters(filters.map(Filter.fromValues))
  }

  static none() {
    return new Filters([])
  }
}
