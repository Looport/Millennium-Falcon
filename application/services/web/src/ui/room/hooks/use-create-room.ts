import {useCallback} from 'react'

import {requestCreateRoom} from '@/room/requests/create-room.request'
import {getToken} from '@/ui/auth/lib/token'

export const useCreateRoom = () => {
  const createRoom = useCallback(async () => {
    const token = getToken()
    if (!token) {
      throw new Error('Token is not defined')
    }

    return await requestCreateRoom(token)
  }, [])

  return {createRoom}
}
