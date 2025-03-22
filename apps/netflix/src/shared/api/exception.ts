export class Exception extends Error {
  constructor(message: string) {
    super(message)

    this.message = message
    this.name = this.constructor.name
  }
}
