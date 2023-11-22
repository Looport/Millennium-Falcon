import {RoomResponse} from '@/room/interfaces/room-response.interface'
import {requestFindRoomByUrl} from '@/room/requests/find-room-by-url.request'
import {getServerToken} from '@/ui/auth/lib/token.server'
import {getServerHeaders} from '@/ui/common/lib/headers.server'

export const requestServerFindRoomByUrl = async (
  url: string
): Promise<RoomResponse> => {
  const accessToken = getServerToken()
  if (!accessToken) {
    throw new Error('No access token')
  }

  return requestFindRoomByUrl(url, accessToken, {
    headers: getServerHeaders(),
  })
}
