import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {TELEGRAPH_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'
import {CreateRoomResponse} from '@/room/interfaces/create-room-response.interface'

export const requestCreateRoom = async (
  accessToken: TokenResponse['accessToken']
): Promise<CreateRoomResponse> =>
  request<CreateRoomResponse>(`${TELEGRAPH_API_URL}/rooms`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
