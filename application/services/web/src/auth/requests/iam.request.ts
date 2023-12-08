import {request} from '@/common/lib/request/request'
import {getPassportApiUrl} from '@/common/lib/request/utils/get-api-urls'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'

import {TokenResponse} from '../interfaces/token-response.interface'
import {UserResponse} from '../interfaces/user-response.interface'

export const requestIam = async (
  accessToken: TokenResponse['accessToken'],
  options: RequestOptions = {}
): Promise<UserResponse> =>
  request<UserResponse>(`${getPassportApiUrl()}/user/iam`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  })
