import {MessagesResponse} from '@/room/interfaces/messages-response.interface'
import {requestFindMessagesByRoomId} from '@/room/requests/find-messages-by-room-id.request'
import {getClientToken} from '@/ui/auth/lib/token.client'

export const requestClientFindMessagesByRoomId = async (
  roomId: number
): Promise<MessagesResponse> => {
  const accessToken = getClientToken()
  if (!accessToken) throw new Error('No access token')
  return requestFindMessagesByRoomId(roomId, accessToken)
}
