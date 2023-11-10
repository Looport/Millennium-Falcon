import {request} from '@/common/lib/request/request'

import {TokenResponse} from '../interfaces/token-response.interface'

import {PASSPORT_API_URL} from './constants'

export const register = async (data: any): Promise<TokenResponse> =>
  request<TokenResponse>(`${PASSPORT_API_URL}/authentication/register`, {
    body: JSON.stringify(data),
  })
