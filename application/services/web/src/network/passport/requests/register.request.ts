import {request} from '@/network/common/request'
import {TokenResponse} from '@/network/passport/interfaces/token-response.interface'
import {PASSPORT_API_URL} from '@/network/passport/requests/constants'

export const register = async (data: any): Promise<TokenResponse> =>
  request<TokenResponse>(`${PASSPORT_API_URL}/authentication/register`, {
    body: JSON.stringify(data),
  })