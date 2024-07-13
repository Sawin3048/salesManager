import { MotherCreator } from './MotherCreator'

export class IntegerMother {
  static random(max?: number, min = 0): number {
    return MotherCreator.random().number.int({ min, max })
  }
}
