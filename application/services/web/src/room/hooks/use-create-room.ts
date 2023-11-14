import {useCallback} from 'react'

import {getToken} from '@/auth/lib/token.client'
import {requestCreateRoom} from '@/room/requests/create-room.request'

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
