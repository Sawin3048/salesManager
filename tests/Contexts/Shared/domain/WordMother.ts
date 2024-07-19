import { MotherCreator } from './MotherCreator'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class WordMother {
  static random({ minLength = 1, maxLength }: { minLength?: number, maxLength: number }) {
    return MotherCreator.random().lorem.word({ length: { min: minLength, max: maxLength } })
  }
}
