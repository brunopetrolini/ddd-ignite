import { ulid } from 'ulid'

export class UniqueEntityID {
  private value: string

  constructor(value?: string) {
    this.value = value ?? ulid()
  }

  public toString() {
    return this.value
  }

  public toValue() {
    return this.value
  }
}
