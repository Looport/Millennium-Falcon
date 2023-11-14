import {PASSPORT_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'

import {TokenResponse} from '../interfaces/token-response.interface'

export const requestRegister = async (data: any): Promise<TokenResponse> =>
  request<TokenResponse>(`${PASSPORT_API_URL}/authentication/register`, {
    body: JSON.stringify(data),
  })
