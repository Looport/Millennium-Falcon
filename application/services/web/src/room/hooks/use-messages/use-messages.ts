import {useReducer} from 'react'

import {reducer} from '@/room/hooks/use-messages/lib/reducer'
import {MessageResponse} from '@/room/interfaces/message-response.interface'

export const useMessages = (defaultMessages: MessageResponse[] = []) => {
  const [message, dispatch] = useReducer(reducer, defaultMessages)
  return [message, dispatch] as const
}
