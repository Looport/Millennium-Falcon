import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {TELEGRAPH_API_URL} from '@/auth/requests/constants'
import {request} from '@/common/lib/request/request'
import {CreateRoomResponse} from '@/room/interfaces/create-room-response.interface'

export const createRoomRequest = async (
  accessToken: TokenResponse['accessToken']
): Promise<CreateRoomResponse> =>
  request<CreateRoomResponse>(`${TELEGRAPH_API_URL}/rooms`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
