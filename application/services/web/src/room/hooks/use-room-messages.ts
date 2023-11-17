import React, {useCallback, useEffect} from 'react'

import {
  dispatchAddMessage,
  dispatchSetMessages,
} from '@/room/hooks/use-messages/lib/actions'
import {useMessages} from '@/room/hooks/use-messages/use-messages'
import {useSubscribeToRoomMessages} from '@/room/hooks/use-subscribe-to-room-messages'
import {MessageResponse} from '@/room/interfaces/message-response.interface'
import {requestClientCreateMessage} from '@/ui/room/requests/create-message.client.request'
import {requestClientFindMessagesByRoomId} from '@/ui/room/requests/find-messages-by-room-id.client.request'

export const useRoomMessages = (roomId: number) => {
  const [messages, dispatchMessagesAction] = useMessages()

  useEffect(() => {
    requestClientFindMessagesByRoomId(roomId).then((messagesResponseData) => {
      dispatchSetMessages(dispatchMessagesAction, messagesResponseData)
    })
  }, [dispatchMessagesAction, roomId])

  const listenMessages = useCallback(
    (message: MessageResponse) => {
      dispatchAddMessage(dispatchMessagesAction, message)
    },
    [dispatchMessagesAction]
  )
  useSubscribeToRoomMessages({
    onMessage: listenMessages,
    roomId,
  })

  const handleMessageForm = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      dispatchAddMessage(
        dispatchMessagesAction,
        await requestClientCreateMessage({
          roomId,
          // eslint-disable-next-line github/async-currenttarget
          text: event.currentTarget.message.value,
        })
      )
    },
    [dispatchMessagesAction, roomId]
  )

  return [messages, {handleMessageForm}] as const
}
