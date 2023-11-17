import {Dispatch} from 'react'

import {
  ActionTypes,
  AddMessageAction,
  SetMessageAction,
} from '@/room/hooks/use-messages/lib/types'
import {MessageResponse} from '@/room/interfaces/message-response.interface'

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
