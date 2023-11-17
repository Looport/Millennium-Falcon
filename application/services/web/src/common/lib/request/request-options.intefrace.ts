export interface RequestOptions
  extends Omit<globalThis.RequestInit, 'headers'> {
  headers?: Record<string, string | undefined>
}
