import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {request} from '@/common/lib/request/request'
import {getTelegraphApiUrl} from '@/common/lib/request/utils/get-api-urls'
import {RequestOptions} from '@/common/lib/request/utils/request-options.intefrace'
import {SignalRequest} from '@/room/interfaces/signals/signal-request.interface'

export const requestSendSignal = async (
  {
    roomId,
    signal,
  }: {
    roomId: number
    signal: SignalRequest
  },
  accessToken: TokenResponse['accessToken'],
  options: RequestOptions = {}
): Promise<SignalRequest> =>
  request<SignalRequest>(`${getTelegraphApiUrl()}/rooms/${roomId}/signals`, {
    body: JSON.stringify(signal),
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
  })
