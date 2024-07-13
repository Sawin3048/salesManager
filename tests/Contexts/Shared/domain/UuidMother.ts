import { MotherCreator } from './MotherCreator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UuidMother {
  static random(): string {
    return MotherCreator.random().datatype.uuid()
  }
}
