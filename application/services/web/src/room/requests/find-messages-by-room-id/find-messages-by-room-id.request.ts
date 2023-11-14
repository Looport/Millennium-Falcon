import {TELEGRAPH_API_URL} from '@/common/lib/request/constants'
import {request} from '@/common/lib/request/request'
import {MessagesResponse} from '@/room/interfaces/message-response.interface'

export const requestFindMessagesByRoomId = async (
  roomId: number,
  {
    headers,
  }: {
    headers?: Record<string, string | undefined>
  }
): Promise<MessagesResponse> =>
  request<MessagesResponse>(`${TELEGRAPH_API_URL}/rooms/${roomId}/messages`, {
    headers,
    method: 'GET',
  })
