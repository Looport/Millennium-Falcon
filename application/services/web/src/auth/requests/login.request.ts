import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {PASSPORT_API_URL} from '@/auth/requests/constants'
import {request} from '@/common/lib/request/request'

export const requestLogin = async (data: any): Promise<TokenResponse> =>
  request<TokenResponse>(`${PASSPORT_API_URL}/authentication/login`, {
    body: JSON.stringify(data),
  })
