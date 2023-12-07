import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {request} from '@/common/lib/request/request'
import {getTelegraphApiUrl} from '@/common/lib/request/utils/get-api-urls'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'
import {MessagesResponse} from '@/room/interfaces/messages/messages-response.interface'

export const requestFindMessagesByRoomId = async (
  roomId: number,
  accessToken: TokenResponse['accessToken'],
  options: RequestOptions = {}
): Promise<MessagesResponse> =>
  request<MessagesResponse>(
    `${getTelegraphApiUrl()}/rooms/${roomId}/messages`,
    {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }
  )
