import {Actions, ActionTypes} from '@/room/hooks/use-messages/lib/types'
import {MessageResponse} from '@/room/interfaces/message-response.interface'

export const reducer = (state: MessageResponse[], action: Actions) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return [...state, action.payload.message]
    case ActionTypes.SET:
      return action.payload.messages
    default:
      return state
  }
}
