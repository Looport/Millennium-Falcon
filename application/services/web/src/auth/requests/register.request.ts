import {PASSPORT_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'
import {RequestOptions} from '@/common/lib/request/request-options.intefrace'

import {TokenResponse} from '../interfaces/token-response.interface'

export const requestRegister = async (
  data: any,
  options: RequestOptions = {}
): Promise<TokenResponse> =>
  request<TokenResponse>(`${PASSPORT_API_URL}/authentication/register`, {
    ...options,
    body: JSON.stringify(data),
  })
