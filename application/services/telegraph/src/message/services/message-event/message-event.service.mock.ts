import {afterEach, mock} from 'node:test'

import {
  createEventEmitterMock,
  EventEmitterMock,
} from '@/app/services/event-emitter/event-emitter.mock'
import {MessageEventService} from '@/message/services/message-event/message-event.service'

type MessageEventServiceMock = {
  [method in keyof MessageEventService]: ReturnType<(typeof mock)['fn']>
}

export const createMessageEventMock = (
  spies?: Omit<Partial<MessageEventServiceMock>, 'eventEmitter'>
): Omit<Partial<MessageEventServiceMock>, 'eventEmitter'> & {
  eventEmitter: Partial<EventEmitterMock>
} => {
  const emitMessageCreatedEventSpy = mock.fn()

  const eventEmitterMock = createEventEmitterMock()

  afterEach(() => {
    emitMessageCreatedEventSpy.mock.resetCalls()
  })

  return {
    emitMessageCreatedEvent: emitMessageCreatedEventSpy,
    eventEmitter: eventEmitterMock,
    ...spies,
  }
}
