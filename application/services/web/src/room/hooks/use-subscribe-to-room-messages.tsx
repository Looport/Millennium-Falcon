import {useEffect} from 'react'

import {MessageResponse} from '@/room/interfaces/message-response.interface'
import {requestClientSubscribeToMessages} from '@/ui/room/requests/subscribe-to-messages.client.request'

export const useSubscribeToRoomMessages = ({
  roomId,
  onMessage,
  onError,
}: {
  roomId: number
  onMessage?: (message: MessageResponse) => void
  onError?: (error: any) => void
}) => {
  useEffect(() => {
    const controller = new AbortController()

    requestClientSubscribeToMessages({
      onMessage,
      roomId,
      signal: controller.signal,
    }).catch(onError)

    return () => {
      controller.abort()
    }
  }, [onError, onMessage, roomId])
}
