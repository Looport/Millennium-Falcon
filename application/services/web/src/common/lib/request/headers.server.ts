import {cookies, headers as nextHeaders} from 'next/headers'

import {API_HOST} from '@/common/lib/request/envs'
import {local} from '@/common/utils/envs'

export const getHeaders = () => {
  const headers = Object.fromEntries(nextHeaders().entries())

  const accessToken = cookies().get('accessToken')?.value

  return {
    ...headers,

    Authorization: `Bearer ${accessToken}`,
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
