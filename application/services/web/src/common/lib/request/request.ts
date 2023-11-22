import {RequestError} from '@/common/lib/request/utils/request-error'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'

export const request = async <T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  console.log(url, {
    ...options,
    headers: {
      ...(options.body ? {'Content-Type': 'application/json'} : {}),
      ...options?.headers,
    },
    method: options.method ?? (options?.body ? 'POST' : 'GET'),
  })
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? {'Content-Type': 'application/json'} : {}),
      ...options?.headers,
    },
    method: options.method ?? (options?.body ? 'POST' : 'GET'),
  })

  const body = await response.json()

  if (!response.ok) {
    throw new RequestError(body.message, response.status, body.errors)
  }

  return body
}
