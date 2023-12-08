import {SignalRequest} from '@/room/interfaces/signals/signal-request.interface'
import {requestSendSignal} from '@/room/requests/send-signal.request'
import {getClientToken} from '@/ui/auth/lib/token.client'

export const requestClientSendSignal = (
  roomId: number,
  signal: SignalRequest
): Promise<SignalRequest> => {
  const accessToken = getClientToken()
  if (!accessToken) throw new Error('No access token')
  return requestSendSignal(
    {
      roomId,
      signal,
    },
    accessToken
  )
}
