import {redirect} from 'next/navigation'
import React from 'react'

import Room from '@/app/room/[roomUrl]/room'
import {requestFindRoomByUrl} from '@/room/requests/find-room-by-url.request'
import {getServerToken} from '@/ui/auth/lib/server-token'
import {getHeaders} from '@/ui/common/utils/get-headers'

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
