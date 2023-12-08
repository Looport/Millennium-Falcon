import {useEffect} from 'react'

import {MessageResponse} from '@/room/interfaces/messages/message-response.interface'
import {requestClientSubscribeToRoomMessages} from '@/ui/room/requests/subscribe-to-room-messages.client.request'

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

    requestClientSubscribeToRoomMessages({
      onMessage,
      roomId,
      signal: controller.signal,
    }).catch(onError)

    return () => {
      controller.abort()
    }
  }, [onError, onMessage, roomId])
}
