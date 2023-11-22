import {headers as getNextHeaders} from 'next/headers'

import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'

const FROM_HEADERS = ['content-length', 'content-type']

export const getServerHeaders = (): RequestOptions['headers'] => ({
  ...Object.keys(Object.fromEntries(getNextHeaders().entries())).reduce(
    (headers, headerKey) => ({
      ...headers,
      ...(FROM_HEADERS.includes(headerKey)
        ? {}
        : {[headerKey]: getNextHeaders().get(headerKey)}),
    }),
    {}
  ),
})
