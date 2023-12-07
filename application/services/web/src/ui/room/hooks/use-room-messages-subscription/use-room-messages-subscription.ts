import React, {useCallback, useEffect} from 'react'

import {MessageResponse} from '@/room/interfaces/messages/message-response.interface'
import {
  dispatchAddMessage,
  dispatchSetMessages,
} from '@/ui/room/hooks/use-messages/lib/actions'
import {useMessages} from '@/ui/room/hooks/use-messages/use-messages'
import {useSubscribeToRoomMessages} from '@/ui/room/hooks/use-room-messages-subscription/use-subscribe-to-room-messages'
import {requestClientCreateMessage} from '@/ui/room/requests/create-message.client.request'
import {requestClientFindMessagesByRoomId} from '@/ui/room/requests/find-messages-by-room-id.client.request'

export const useRoomMessagesSubscription = (roomId: number) => {
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
