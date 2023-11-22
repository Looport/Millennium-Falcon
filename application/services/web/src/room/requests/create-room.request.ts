import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {TELEGRAPH_API_URL} from '@/common/lib/api/constants'
import {request} from '@/common/lib/request/request'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'
import {RoomResponse} from '@/room/interfaces/room-response.interface'

export const requestCreateRoom = async (
  accessToken: TokenResponse['accessToken'],
  options: RequestOptions = {}
): Promise<RoomResponse> =>
  request<RoomResponse>(`${TELEGRAPH_API_URL}/rooms`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
