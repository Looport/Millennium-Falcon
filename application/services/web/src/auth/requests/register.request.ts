import {request} from '@/common/lib/request/request'
import {getPassportApiUrl} from '@/common/lib/request/utils/get-api-urls'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'

import {TokenResponse} from '../interfaces/token-response.interface'

export const requestRegister = async (
  credentials: any,
  options: RequestOptions = {}
): Promise<TokenResponse> =>
  request<TokenResponse>(`${getPassportApiUrl()}/authentication/register`, {
    ...options,
    body: JSON.stringify(credentials),
  })
