import {headers as nextHeaders} from 'next/dist/client/components/headers'

import {local} from '@/common/utils/envs'
import {API_HOST} from '@/network/common/envs'

export const getHeaders = () => {
  const headers = Object.fromEntries(nextHeaders().entries())

  return {
    ...headers,
    /**
     * When an application is running on local machine(localhost)
     * and not on k8s,
     * we should use API_HOST
     * to send requests to the server.
     * Because headers.host in this case localhost:3000,
     * but ingress server deployed on k8s with API_HOST
     */
    host: local() ? API_HOST : headers.host,
  }
}
