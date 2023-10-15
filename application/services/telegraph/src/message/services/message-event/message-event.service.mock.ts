import {mock} from 'node:test'

import {EventEmitter2} from '@nestjs/event-emitter'

import {MessageEventService} from '@/message/services/message-event/message-event.service'

type MessageEventServiceMock = {
  [method in keyof MessageEventService]: ReturnType<(typeof mock)['fn']>
}

type EventEmitterMock = {
  [method in keyof EventEmitter2]: ReturnType<(typeof mock)['fn']>
}

export const createMessageEventMock = (
  spies?: Omit<Partial<MessageEventServiceMock>, 'eventEmitter'> & {
    eventEmitter: EventEmitterMock
  }
): Omit<Partial<MessageEventServiceMock>, 'eventEmitter'> & {
  eventEmitter: EventEmitterMock
} => {
  const emitMessageCreatedEventSpy = mock.fn()

  const eventEmitterMock: Partial<EventEmitterMock> = {
    addListener: mock.fn(),
    emit: mock.fn(),
    on: mock.fn(),
    removeListener: mock.fn(),
  }

  return {
    emitMessageCreatedEvent: emitMessageCreatedEventSpy,
    eventEmitter: eventEmitterMock,
    ...spies,
  }
}
