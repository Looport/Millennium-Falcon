import {afterEach, mock} from 'node:test'

import {EventEmitter2} from '@nestjs/event-emitter'

export type EventEmitterMock = {
  [method in keyof EventEmitter2]: ReturnType<(typeof mock)['fn']>
}

export const createEventEmitterMock = (
  spies?: Partial<EventEmitterMock>
): Partial<EventEmitterMock> => {
  const eventEmitterMock: Partial<EventEmitterMock> = {
    addListener: mock.fn(),
    emit: mock.fn(),
    on: mock.fn(),
    removeListener: mock.fn(),
  }

  afterEach(() => {
    eventEmitterMock.addListener.mock.resetCalls()
    eventEmitterMock.emit.mock.resetCalls()
    eventEmitterMock.on.mock.resetCalls()
    eventEmitterMock.removeListener.mock.resetCalls()
  })

  return {
    ...eventEmitterMock,
    ...spies,
  }
}
