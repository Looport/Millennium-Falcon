import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {TELEGRAPH_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'
import {CreateRoomResponse} from '@/room/interfaces/create-room-response.interface'

export const requestCreateMessage = async (
  {
    roomId,
    text,
  }: {
    roomId: number
    text: string
  },
  accessToken: TokenResponse['accessToken']
): Promise<CreateRoomResponse> =>
  request<CreateRoomResponse>(`${TELEGRAPH_API_URL}/rooms/${roomId}/messages`, {
    body: JSON.stringify({text}),
    // eslint-disable-next-line no-warning-comments
    // TODO: add token as part of request
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
