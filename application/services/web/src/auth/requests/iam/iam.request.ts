import {PASSPORT_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'

import {TokenResponse} from '../../interfaces/token-response.interface'
import {UserResponse} from '../../interfaces/user-response.interface'

export const requestFetchIam = async ({
  accessToken,
  headers,
}: TokenResponse & {
  headers?: Record<string, string | undefined>
}): Promise<UserResponse> =>
  request<UserResponse>(`${PASSPORT_API_URL}/user/iam`, {
    headers,
  })
