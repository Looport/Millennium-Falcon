import {useCallback} from 'react'

import {SignalResponse} from '@/room/interfaces/signals/signal-response.interface'
import {requestClientSubscribeToRoomSignals} from '@/ui/room/requests/subscribe-to-room-signal.client.request'

export const useSubscribeToRoomSignals = ({roomId}: {roomId: number}) =>
  useCallback(
    ({
      onSignal,
      onError,
    }: {
      onSignal?: (signalResponse: SignalResponse) => void
      onError?: (error: any) => void
    }) => {
      const controller = new AbortController()

      requestClientSubscribeToRoomSignals({
        onSignal,
        roomId,
        signal: controller.signal,
      }).catch(onError)

      return () => {
        controller.abort()
      }
    },
    [roomId]
  )
