import {PASSPORT_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'
import {RequestOptions} from '@/common/lib/request/request-options.intefrace'

import {TokenResponse} from '../interfaces/token-response.interface'
import {UserResponse} from '../interfaces/user-response.interface'

export const requestIam = async (
  accessToken: TokenResponse['accessToken'],
  options: RequestOptions = {}
): Promise<UserResponse> =>
  request<UserResponse>(`${PASSPORT_API_URL}/user/iam`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  })
