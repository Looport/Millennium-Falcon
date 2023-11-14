import {redirect} from 'next/navigation'
import React from 'react'

import {getServerToken} from '@/auth/lib/token.server'
import {getHeaders} from '@/common/lib/request/headers.server'
import Room from '@/room/components/room'
import {requestFindRoomByUrl} from '@/room/requests/find-room-by-url.request'

export default async function Page({
  params: {roomUrl},
}: {
  params: {roomUrl: string}
}) {
  const accessToken = getServerToken()

  if (!accessToken) {
    return redirect('/login')
  }

  const room = await requestFindRoomByUrl(roomUrl, {
    accessToken,
    headers: getHeaders(),
  })
  if (!room) {
    return redirect('/404')
  }

  return <Room room={room} />
}
