export const request = async <T>(
  url: string,
  init: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: new Headers({
      'Content-Type': 'application/json',
      ...init?.headers,
    }),
    method: init.method ?? init?.body ? 'POST' : 'GET',
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body)
  }

  return body
}
