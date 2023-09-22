import {TokenResponse} from '@/network/auth/interfaces/token-response.interface'
import {UserResponse} from '@/network/auth/interfaces/user-response.interface'
import {request} from '@/network/common/request'

export const fetchIam = async ({
  accessToken,
}: TokenResponse): Promise<UserResponse> =>
  request<UserResponse>('http://aloco.local/api/passport/user/iam', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
