import {getHeaders} from '@/common/lib/request/headers.server'
import {MessagesResponse} from '@/room/interfaces/message-response.interface'
import {requestFindMessagesByRoomId} from '@/room/requests/find-messages-by-room-id/find-messages-by-room-id.request'

export const requestServerFindMessagesByRoomId = async (
  roomId: number
): Promise<MessagesResponse> =>
  requestFindMessagesByRoomId(roomId, {
    headers: getHeaders(),
  })
