import {useCallback} from 'react'

import {CreateRoomResponse} from '@/room/interfaces/create-room-response.interface'
import {createRoomRequest} from '@/room/requests/create-room.request'
import {getToken} from '@/ui/auth/lib/token'

export const useCreateRoom = () => {
  const createRoom = useCallback(async () => {
    const token = getToken()
    if (!token) {
      throw new Error('Token is not defined')
    }

    return await createRoomRequest(token)
  }, [])

  return {createRoom}
}
