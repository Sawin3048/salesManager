export interface StringHasher {
  hash: (value: string) => Promise<string>
  checkHash: (value: string, hashedValue: string) => Promise<boolean>
}
