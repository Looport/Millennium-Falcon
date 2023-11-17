import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {TELEGRAPH_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'
import {RequestOptions} from '@/common/lib/request/request-options.intefrace'
import {MessagesResponse} from '@/room/interfaces/messages-response.interface'

export const requestFindMessagesByRoomId = async (
  roomId: number,
  accessToken: TokenResponse['accessToken'],
  options: RequestOptions = {}
): Promise<MessagesResponse> =>
  request<MessagesResponse>(`${TELEGRAPH_API_URL}/rooms/${roomId}/messages`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  })
