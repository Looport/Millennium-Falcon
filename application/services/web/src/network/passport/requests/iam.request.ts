import {request} from '@/network/common/request'
import {TokenResponse} from '@/network/passport/interfaces/token-response.interface'
import {UserResponse} from '@/network/passport/interfaces/user-response.interface'
import {PASSPORT_API_URL} from '@/network/passport/requests/constants'

export const fetchIam = async ({
  accessToken,
  headers,
}: TokenResponse & {
  headers?: Record<string, string | undefined>
}): Promise<UserResponse> =>
  request<UserResponse>(`${PASSPORT_API_URL}/user/iam`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  })
