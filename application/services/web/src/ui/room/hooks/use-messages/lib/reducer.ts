import {MessageResponse} from '@/room/interfaces/messages/message-response.interface'
import {Actions, ActionTypes} from '@/ui/room/hooks/use-messages/lib/types'

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
