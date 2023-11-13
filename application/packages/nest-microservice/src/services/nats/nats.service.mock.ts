import {afterEach, mock} from 'node:test'

import {NatsService} from './nats.service'

type NatsServiceMock = {
  [method in keyof NatsService]: ReturnType<(typeof mock)['fn']>
}

export const createNatsServiceMock = (
  spies?: Partial<NatsServiceMock>
): Partial<NatsServiceMock> => {
  const emit = mock.fn()
  const send = mock.fn()

  afterEach(() => {
    emit.mock.resetCalls()
    send.mock.resetCalls()
  })

  return {
    emit,
    send,
    ...spies,
  }
}
