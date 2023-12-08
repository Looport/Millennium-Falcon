import React, {useEffect} from 'react'

import {SignalEnum} from '@/room/interfaces/signals/enums/signal.enum'
import {SignalResponse} from '@/room/interfaces/signals/signal-response.interface'
import {usePeer} from '@/ui/common/hooks/use-peer'
import {useSubscribeToRoomSignals} from '@/ui/room/hooks/use-subscribe-to-room-signals'
import {requestClientSendSignal} from '@/ui/room/requests/send-signal.client.request'

export const useSubscribeToCall = (roomId: number) => {
  const {peerId, ownStream, answererStream, startCall} = usePeer()
  const [answererPeerId, setAnswererPeerId] = React.useState<
    string | undefined
  >(undefined)

  const subscribe = useSubscribeToRoomSignals({
    roomId,
  })

  useEffect(() => {
    if (!peerId) {
      return
    }

    requestClientSendSignal(roomId, {
      type: SignalEnum.join,
    })
  }, [roomId, peerId])

  useEffect(() => {
    if (!peerId) {
      return
    }

    return subscribe({
      onSignal: (signalResponse: SignalResponse) => {
        if (signalResponse.signal.type === SignalEnum.join) {
          requestClientSendSignal(roomId, {
            data: {
              peerId,
            },
            type: SignalEnum.offer,
          })
        }

        if (signalResponse.signal.type === SignalEnum.offer) {
          setAnswererPeerId(signalResponse.signal.data.peerId)
        }
      },
    })
  }, [peerId, roomId, subscribe])

  useEffect(() => {
    if (!answererPeerId) {
      return
    }

    startCall(answererPeerId)
  }, [answererPeerId, startCall])

  return {
    answererStream,
    ownStream,
  }
}
