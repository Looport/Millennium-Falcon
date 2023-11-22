import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {PASSPORT_API_URL} from '@/common/lib/api/constants'
import {request} from '@/common/lib/request/request'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'

export const requestLogin = async (
  data: any,
  options: RequestOptions = {}
): Promise<TokenResponse> =>
  request<TokenResponse>(`${PASSPORT_API_URL}/authentication/login`, {
    ...options,
    body: JSON.stringify(data),
  })
