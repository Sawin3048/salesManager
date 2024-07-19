import { StringHasher } from '../../../../src/Contexts/Shared/domain/StringHasher'

export class HasherMock implements StringHasher {
  mockHash = jest.fn()

  async hash(value: string) {
    this.mockHash(value)
    return value
  }

  assertHashHasBeenCalledWith(value: string) {
    expect(this.mockHash).toHaveBeenCalledWith(value)
  }

  async checkHash(value: string) {
    return true
  }
}
