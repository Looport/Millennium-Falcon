import {MessageResponse} from '@/room/interfaces/messages/message-response.interface'

export enum ActionTypes {
  ADD = 'add',
  SET = 'set',
}

export type AddMessageAction = {
  type: typeof ActionTypes.ADD
  payload: {message: MessageResponse}
}

export type SetMessageAction = {
  type: typeof ActionTypes.SET
  payload: {messages: MessageResponse[]}
}

export type Actions = AddMessageAction | SetMessageAction
