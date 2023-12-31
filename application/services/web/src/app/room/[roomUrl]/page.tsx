import {redirect} from 'next/navigation'
import React from 'react'

import {getServerToken} from '@/ui/auth/lib/token.server'
import Room from '@/ui/room/components/room/room'
import {requestServerFindRoomByUrl} from '@/ui/room/requests/find-room-by-url.server.request'

export default async function Page({
  params: {roomUrl},
}: {
  params: {roomUrl: string}
}) {
  const accessToken = getServerToken()
  if (!accessToken) {
    redirect('/join?variant=login')
  }

  const room = await requestServerFindRoomByUrl(roomUrl)
  if (!room) {
    redirect('/404')
  }

  return <Room room={room} />
}
