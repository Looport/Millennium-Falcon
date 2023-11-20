import {headers} from 'next/headers'

import {API_HOST} from '@/common/lib/api/get-api-url'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'
import {local} from '@/common/utils/envs'

interface GetServerHeaders {
  // For requests that are made inside k8s cluster. Default: true
  internalCall?: boolean
}

export const getServerHeaders = (
  {internalCall}: GetServerHeaders = {internalCall: true}
): RequestOptions['headers'] => ({
  ...Object.keys(Object.fromEntries(headers().entries())).reduce(
    (acc, key) => ({
      ...acc,
      ...(['content-length'].includes(key) ? {} : {[key]: headers().get(key)}),
    }),
    {}
  ),
  ...(local() && internalCall
    ? {host: API_HOST}
    : {host: Object.fromEntries(headers().entries()).host}),
})
