import {TokenResponse} from '@/network/auth/interfaces/token-response.interface'
import {request} from '@/network/common/request'

export const register = async (data: any): Promise<TokenResponse> =>
  request<TokenResponse>(
    'http://aloco.local/api/passport/authentication/register',
    {
      body: JSON.stringify(data),
    }
  )
