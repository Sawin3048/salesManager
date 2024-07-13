import { IntegerMother } from './IntegerMother'
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Repeater {
  static random(callable: Function, iterations?: number) {
    return Array(iterations ?? IntegerMother.random(20))
      .fill({})
      .map(() => callable())
  }
}
