'use client'

import React from 'react'

import {RoomResponse} from '@/room/interfaces/room-response.interface'
import {Conference} from '@/ui/room/components/room/components/conference'
import {MessageForm} from '@/ui/room/components/room/components/message-form'
import {Messages} from '@/ui/room/components/room/components/messages'
import {MessagesLayout} from '@/ui/room/components/room/components/messages-layout'
import {RoomLayout} from '@/ui/room/components/room/components/room-layout'
import {useRoomMessagesSubscription} from '@/ui/room/hooks/use-room-messages-subscription/use-room-messages-subscription'
import {useSubscribeToCall} from '@/ui/room/hooks/use-subscribe-to-call'

export default function Room({room}: {room: RoomResponse}) {
  const [messages, {handleMessageForm}] = useRoomMessagesSubscription(room.id)
  const {ownStream, answererStream} = useSubscribeToCall(room.id)

  return (
    <RoomLayout
      messages={
        <MessagesLayout>
          <Messages messages={messages} />
          <MessageForm onSubmit={handleMessageForm} />
        </MessagesLayout>
      }
      conference={
        <Conference
          ownStream={ownStream}
          answererStream={answererStream}
        />
      }
    />
  )
}
