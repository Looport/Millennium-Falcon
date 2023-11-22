import {headers as getNextHeaders} from 'next/headers'

import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'

export const getServerHeaders = (): RequestOptions['headers'] => ({
  ...Object.keys(Object.fromEntries(getNextHeaders().entries())).reduce(
    (headers, headerKey) => ({
      ...headers,
      ...(['content-length', 'content-type'].includes(headerKey)
        ? {}
        : {[headerKey]: getNextHeaders().get(headerKey)}),
    }),
    {}
  ),
})
