import {MessageResponse} from '@/room/interfaces/message-response.interface'
import {requestCreateMessage} from '@/room/requests/create-message.request'
import {getClientToken} from '@/ui/auth/lib/token.client'

export const requestClientCreateMessage = (payload: {
  roomId: number
  text: string
}): Promise<MessageResponse> => {
  const accessToken = getClientToken()
  if (!accessToken) throw new Error('No access token')
  return requestCreateMessage(payload, accessToken)
}
