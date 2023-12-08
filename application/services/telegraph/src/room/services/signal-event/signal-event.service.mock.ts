import {mock} from 'node:test'

import {
  createEventEmitterMock,
  EventEmitterMock,
} from '@/app/services/event-emitter/event-emitter.mock'
import {SignalEventService} from '@/room/services/signal-event/signal-event.service'

type SignalEventServiceMock = {
  [method in keyof SignalEventService]: ReturnType<(typeof mock)['fn']>
}

export const createSignalEventMock = (
  spies?: Omit<Partial<SignalEventServiceMock>, 'eventEmitter'>
): Omit<Partial<SignalEventServiceMock>, 'eventEmitter'> & {
  eventEmitter: Partial<EventEmitterMock>
} => {
  const emitSignalEventSpy = mock.fn()

  const eventEmitterMock = createEventEmitterMock()

  return {
    emitSignalEvent: emitSignalEventSpy,
    eventEmitter: eventEmitterMock,
    ...spies,
  }
}
