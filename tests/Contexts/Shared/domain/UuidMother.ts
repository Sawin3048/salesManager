export class UuidMother {
  static random(): string {
    // return MotherCreator.random().string.uuid()
    return crypto.randomUUID()
  }
}
