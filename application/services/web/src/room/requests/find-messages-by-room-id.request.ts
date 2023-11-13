import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {TELEGRAPH_API_URL} from '@/auth/requests/constants'
import {request} from '@/common/lib/request/request'
import {CreateRoomResponse} from '@/room/interfaces/create-room-response.interface'

export const requestFindMessagesByRoomId = async (
  roomId: number,
  {
    accessToken,
    headers,
  }: TokenResponse & {
    headers?: Record<string, string | undefined>
  }
): Promise<CreateRoomResponse> =>
  request<CreateRoomResponse>(`${TELEGRAPH_API_URL}/rooms/${roomId}/messages`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
    method: 'GET',
  })
