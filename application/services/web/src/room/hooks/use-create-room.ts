import {useCallback} from 'react'

import {requestCreateRoom} from '@/room/requests/create-room.request'
import {getClientToken} from '@/ui/auth/lib/token.client'

export const useCreateRoom = () => {
  const createRoom = useCallback(async () => {
    const token = getClientToken()
    if (!token) {
      throw new Error('Token is not defined')
    }

    return await requestCreateRoom(token)
  }, [])

  return {createRoom}
}
