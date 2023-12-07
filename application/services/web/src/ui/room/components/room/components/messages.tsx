'use client'

import React, {useLayoutEffect, useRef} from 'react'

import {MessagesResponse} from '@/room/interfaces/messages/messages-response.interface'
import {classname} from '@/ui/common/utils/classname'

export const Messages = ({messages}: {messages: MessagesResponse}) => {
  const messagesRef = useRef<null | HTMLDivElement>(null)
  useLayoutEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight)
  }, [messages])

  return (
    <div
      className={classname(['flex-1 overflow-y-scroll'])}
      ref={messagesRef}
    >
      {messages.map((message) => (
        <div key={message.id}>
          {message.user.email}: {message.text}
        </div>
      ))}
    </div>
  )
}
