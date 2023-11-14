import {redirect} from 'next/navigation'
import React from 'react'

import {getServerToken} from '@/auth/lib/token.server'
import {getHeaders} from '@/common/lib/request/headers.server'
import Room from '@/room/components/room'
import {requestServerFindMessagesByRoomId} from '@/room/requests/find-messages-by-room-id/find-messages-by-room-id.server.request'
import {requestFindRoomByUrl} from '@/room/requests/find-room-by-url.request'

export default async function Page({
  params: {roomUrl},
}: {
  params: {roomUrl: string}
}) {
  const accessToken = getServerToken()

  if (!accessToken) {
    return redirect('/join')
  }

  const room = await requestFindRoomByUrl(roomUrl, {
    accessToken,
    headers: getHeaders(),
  })
  if (!room) {
    return redirect('/404')
  }

  const messages = await requestServerFindMessagesByRoomId(room.id)

  console.log(messages)

  return (
    <Room
      room={room}
      messages={messages}
    />
  )
}
