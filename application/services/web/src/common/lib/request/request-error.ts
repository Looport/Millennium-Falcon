export class RequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: any[] = []
  ) {
    super(message)
  }
}
