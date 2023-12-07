import {Dispatch} from 'react'

import {MessageResponse} from '@/room/interfaces/messages/message-response.interface'
import {
  ActionTypes,
  AddMessageAction,
  SetMessageAction,
} from '@/ui/room/hooks/use-messages/lib/types'

export const dispatchAddMessage = (
  dispatch: Dispatch<AddMessageAction>,
  message: MessageResponse
) => {
  dispatch({payload: {message}, type: ActionTypes.ADD})
}

export const dispatchSetMessages = (
  dispatch: Dispatch<SetMessageAction>,
  messages: MessageResponse[]
) => {
  dispatch({payload: {messages}, type: ActionTypes.SET})
}
