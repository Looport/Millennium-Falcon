import {headers as nextHeaders} from 'next/dist/client/components/headers'

import {local} from '@/common/utils/envs'
import {API_HOST} from '@/network/common/envs'

export const getHeaders = () => {
  const headers = Object.fromEntries(nextHeaders().entries())

  return {
    ...headers,
    host: local() ? API_HOST : headers.host,
  }
}
