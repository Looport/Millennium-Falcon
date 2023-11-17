import {Dispatch, useReducer} from 'react'

import {MessageResponse} from '@/room/interfaces/message-response.interface'

const ADD_TYPE = 'add'
const SET_TYPE = 'set'

type AddMessage = {type: typeof ADD_TYPE; payload: {message: MessageResponse}}
type SetMessage = {
  type: typeof SET_TYPE
  payload: {messages: MessageResponse[]}
}

type Actions = AddMessage | SetMessage

const reducer = (state: MessageResponse[], action: Actions) => {
  switch (action.type) {
    case ADD_TYPE:
      return [...state, action.payload.message]
    case SET_TYPE:
      return action.payload.messages
    default:
      return state
  }
}

export const dispatchAddMessage = (
  dispatch: Dispatch<AddMessage>,
  message: MessageResponse
) => {
  dispatch({payload: {message}, type: ADD_TYPE})
}

export const dispatchSetMessages = (
  dispatch: Dispatch<SetMessage>,
  messages: MessageResponse[]
) => {
  dispatch({payload: {messages}, type: SET_TYPE})
}

export const useMessages = (defaultMessages: MessageResponse[] = []) => {
  const [message, dispatch] = useReducer(reducer, defaultMessages)
  return [message, dispatch] as const
}
