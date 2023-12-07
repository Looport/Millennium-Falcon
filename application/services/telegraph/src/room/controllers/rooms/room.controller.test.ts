import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {authMock} from '@looport/nest-auth'
import {Test, TestingModule} from '@nestjs/testing'

import {MessageService} from '@/message/services/message/message.service'
import {createMessageServiceMock} from '@/message/services/message/message.service.mock'
import {MessageEventService} from '@/message/services/message-event/message-event.service'
import {createMessageEventMock} from '@/message/services/message-event/message-event.service.mock'
import {RoomService} from '@/room/services/rooms/room.service'
import {createRoomMockService} from '@/room/services/rooms/room.service.mock'
import {SignalEventService} from '@/room/services/signal-event/signal-event.service'
import {createSignalEventMock} from '@/room/services/signal-event/signal-event.service.mock'
import {messageMock} from '@/storage/repositories/message/message.repository.mock'
import {roomMock} from '@/storage/repositories/room/room.repository.mock'

import {RoomController} from './room.controller'

describe('RoomController', () => {
  let controller: RoomController

  const messageServiceMock = createMessageServiceMock()
  const roomServiceMock = createRoomMockService()
  const messageEventServiceMock = createMessageEventMock()
  const signalEventServiceMock = createSignalEventMock()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: RoomService,
          useValue: roomServiceMock,
        },
        {
          provide: MessageService,
          useValue: messageServiceMock,
        },
        {
          provide: MessageEventService,
          useValue: messageEventServiceMock,
        },
        {
          provide: SignalEventService,
          useValue: signalEventServiceMock,
        },
      ],
    }).compile()

    controller = module.get<RoomController>(RoomController)
  })

  it('should be defined', () => {
    ok(controller)
  })

  describe('sse messages', () => {
    afterEach(() => {
      mock.restoreAll()
    })

    it('should emit created message', async () => {
      const result = await controller.createMessage(
        roomMock.id,
        {email: messageMock.user.email, sub: messageMock.user.id},
        {text: messageMock.text}
      )

      deepEqual(result, {
        id: messageMock.id,
        roomId: roomMock.id,
        text: messageMock.text,
        userId: messageMock.user.id,
      })

      deepEqual(
        messageEventServiceMock.emitMessageCreatedEvent.mock.calls[0].arguments,
        [
          roomMock.id,
          {
            id: messageMock.id,
            roomId: roomMock.id,
            text: messageMock.text,
            userId: messageMock.user.id,
          },
        ]
      )
    })

    it('should emit message when subscribed to sse', async () => {
      let rxHandler
      // eslint-disable-next-line max-len
      messageEventServiceMock.eventEmitter.addListener.mock.mockImplementationOnce(
        (__, _rxHandler) => {
          rxHandler = _rxHandler
        }
      )
      // eslint-disable-next-line max-len
      messageEventServiceMock.emitMessageCreatedEvent.mock.mockImplementationOnce(
        (event, message) => {
          rxHandler(message)
        }
      )

      const receiver = authMock
      const observable = controller.subscribeMessages(roomMock.id, receiver)
      const waitForEvent = new Promise((resolve) => {
        observable.subscribe((message) => {
          resolve(message)
        })
      })

      const sender = {
        email: 'sender',
        sub: 88,
      }
      const createdMessageMock = {
        ...messageMock,
        user: {email: sender.email, id: sender.sub},
      }
      messageServiceMock.create.mock.mockImplementation(
        () => createdMessageMock
      )
      await controller.createMessage(roomMock.id, sender, {
        text: createdMessageMock.text,
      })
      const emitted = await waitForEvent

      deepEqual(emitted, {
        data: createdMessageMock,
      })
    })

    it('should not emit message when sender same as receiver', async () => {
      let rxHandler
      // eslint-disable-next-line max-len
      messageEventServiceMock.eventEmitter.addListener.mock.mockImplementationOnce(
        (__, _rxHandler) => {
          rxHandler = _rxHandler
        }
      )
      // eslint-disable-next-line max-len
      messageEventServiceMock.emitMessageCreatedEvent.mock.mockImplementationOnce(
        (event, message) => {
          rxHandler(message)
        }
      )

      const receiver = authMock
      const observable = controller.subscribeMessages(roomMock.id, receiver)
      const MESSAGE_NOT_EMIT_ERROR = new Error('MESSAGE_NOT_EMIT')
      const waitForEvent = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(MESSAGE_NOT_EMIT_ERROR)
        })

        observable.subscribe((message) => {
          clearTimeout(timeout)
          resolve(message)
        })
      })

      const sender = receiver
      const createdMessageMock = {
        ...messageMock,
        user: {email: sender.email, id: sender.sub},
      }
      messageServiceMock.create.mock.mockImplementation(
        () => createdMessageMock
      )
      await controller.createMessage(roomMock.id, sender, {
        text: messageMock.text,
      })

      try {
        await waitForEvent
        throw Error('MESSAGE_EMITTED')
      } catch (error) {
        deepEqual(error, MESSAGE_NOT_EMIT_ERROR)
      }

      messageServiceMock.create.mock.resetCalls()
    })
  })

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe.todo('sse signals', () => {})

  describe('findMessages', () => {
    afterEach(() => {
      mock.restoreAll()
    })

    it('should return messages', async () => {
      const result = await controller.findMessages(roomMock.id)

      deepEqual(messageServiceMock.find.mock.calls[0].arguments, [
        {roomId: roomMock.id},
      ])

      deepEqual(result, [messageMock])
    })
  })

  describe('findByUrl', () => {
    afterEach(() => {
      mock.restoreAll()
    })

    it('should return room', async () => {
      const result = await controller.findByUrl(roomMock.url)

      deepEqual(roomServiceMock.findOne.mock.calls[0].arguments, [
        {
          url: roomMock.url,
        },
      ])

      deepEqual(result, roomMock)

      roomServiceMock.findOne.mock.resetCalls()
    })
  })

  describe('findById', () => {
    afterEach(() => {
      mock.restoreAll()
    })

    it('should return room', async () => {
      const result = await controller.findById(roomMock.id)

      console.log(roomServiceMock.findOne.mock.calls.length)
      deepEqual(roomServiceMock.findOne.mock.calls[0].arguments, [
        {
          id: roomMock.id,
        },
      ])

      deepEqual(result, roomMock)
    })
  })
})
