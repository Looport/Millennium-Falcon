import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'
import {RoomResponse} from '@/room/interfaces/room-response.interface'
import {requestFindRoomByUrl} from '@/room/requests/find-room-by-url.request'
import {getServerToken} from '@/ui/auth/lib/token.server'

export const requestServerFindRoomByUrl = async (
  url: string,
  options: RequestOptions = {}
): Promise<RoomResponse> => {
  const accessToken = getServerToken()
  if (!accessToken) {
    throw new Error('No access token')
  }

  return requestFindRoomByUrl(url, accessToken, options)
}
