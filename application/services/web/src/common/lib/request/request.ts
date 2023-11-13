import {development} from '@/common/utils/envs'

class RequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: any[] = []
  ) {
    super(message)
  }
}

export const request = async <T>(
  url: string,
  init: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...(init.body ? {'Content-Type': 'application/json'} : {}),
      ...init?.headers,
    },
    method: init.method ?? (init?.body ? 'POST' : 'GET'),
  })

  const body = await response.json()

  if (development()) {
    console.log('request', url, init, body)
  }

  if (!response.ok) {
    throw new RequestError(body.message, response.status, body.errors)
  }

  return body
}
