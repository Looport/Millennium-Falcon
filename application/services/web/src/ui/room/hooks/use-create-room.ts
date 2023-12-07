import {useCallback} from 'react'

import {requestCreateRoom} from '@/room/requests/create-room.request'
import {getClientToken} from '@/ui/auth/lib/token.client'

export const useCreateRoom = () => {
  const createRoom = useCallback(async () => {
    const accessToken = getClientToken()
    if (!accessToken) {
      throw new Error('Token is not defined')
    }

    return await requestCreateRoom(accessToken)
  }, [])

  return {createRoom}
}
