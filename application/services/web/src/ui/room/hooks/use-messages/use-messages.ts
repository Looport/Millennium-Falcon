import {useReducer} from 'react'

import {MessageResponse} from '@/room/interfaces/message-response.interface'
import {reducer} from '@/ui/room/hooks/use-messages/lib/reducer'

export const useMessages = (defaultMessages: MessageResponse[] = []) => {
  const [message, dispatch] = useReducer(reducer, defaultMessages)
  return [message, dispatch] as const
}
