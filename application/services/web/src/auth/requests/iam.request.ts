import {request} from '@/common/lib/request/request'

import {TokenResponse} from '../interfaces/token-response.interface'
import {UserResponse} from '../interfaces/user-response.interface'

import {PASSPORT_API_URL} from './constants'

export const fetchIam = async ({
  accessToken,
  headers,
}: TokenResponse & {
  headers?: Record<string, string | undefined>
}): Promise<UserResponse> =>
  request<UserResponse>(`${PASSPORT_API_URL}/user/iam`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  })
