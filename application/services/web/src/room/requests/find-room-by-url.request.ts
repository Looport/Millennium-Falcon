import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {TELEGRAPH_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'
import {CreateRoomResponse} from '@/room/interfaces/create-room-response.interface'

export const requestFindRoomByUrl = async (
  url: string,
  {
    accessToken,
    headers,
  }: TokenResponse & {
    headers?: Record<string, string | undefined>
  }
): Promise<CreateRoomResponse> =>
  request<CreateRoomResponse>(`${TELEGRAPH_API_URL}/rooms/url/${url}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
    method: 'GET',
  })
