import {mock} from 'node:test'

import {NatsService} from './nats.service'

type NatsServiceMock = {
  [method in keyof NatsService]: ReturnType<(typeof mock)['fn']>
}

export const createNatsMockService = (
  spies?: Partial<NatsServiceMock>
): Partial<NatsServiceMock> => {
  const emit = mock.fn()
  const send = mock.fn()

  return {
    emit,
    send,
    ...spies,
  }
}
