import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {request} from '@/common/lib/request/request'
import {getPassportApiUrl} from '@/common/lib/request/utils/get-api-urls'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'

export const requestLogin = async (
  data: any,
  options: RequestOptions = {}
): Promise<TokenResponse> =>
  request<TokenResponse>(`${getPassportApiUrl()}/authentication/login`, {
    ...options,
    body: JSON.stringify(data),
  })
