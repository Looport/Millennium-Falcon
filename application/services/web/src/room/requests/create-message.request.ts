import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {TELEGRAPH_API_URL} from '@/common/lib/api/constants'
import {request} from '@/common/lib/request/request'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'
import {MessageResponse} from '@/room/interfaces/message-response.interface'

export const requestCreateMessage = async (
  {
    roomId,
    text,
  }: {
    roomId: number
    text: string
  },
  accessToken: TokenResponse['accessToken'],
  options: RequestOptions = {}
): Promise<MessageResponse> =>
  request<MessageResponse>(`${TELEGRAPH_API_URL}/rooms/${roomId}/messages`, {
    body: JSON.stringify({text}),
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
