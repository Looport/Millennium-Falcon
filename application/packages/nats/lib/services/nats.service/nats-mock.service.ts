import {mock} from 'node:test'

import {NATSService} from './nats.service'

type NatsMockService = {
  [method in keyof NATSService]: ReturnType<(typeof mock)['fn']>
}

export const createNATSMockService = (
  spies?: Partial<NatsMockService>
): Partial<NatsMockService> => {
  const emit = mock.fn()
  const send = mock.fn()

  return {
    emit,
    send,
    ...spies,
  }
}
