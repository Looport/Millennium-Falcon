import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {request} from '@/common/lib/request/request'
import {getTelegraphApiUrl} from '@/common/lib/request/utils/get-api-urls'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'
import {RoomResponse} from '@/room/interfaces/room-response.interface'

export const requestFindRoomByUrl = async (
  url: string,
  accessToken: TokenResponse['accessToken'],
  options: RequestOptions = {}
): Promise<RoomResponse> =>
  request<RoomResponse>(`${getTelegraphApiUrl()}/rooms/url/${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  })
