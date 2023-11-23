import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {request} from '@/common/lib/request/request'
import {getTelegraphApiUrl} from '@/common/lib/request/utils/get-api-urls'
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
  request<MessageResponse>(`${getTelegraphApiUrl()}/rooms/${roomId}/messages`, {
    body: JSON.stringify({text}),
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
