import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {authMock} from '@looport/nest-auth'
import {EventEmitter2} from '@nestjs/event-emitter'
import {Test, TestingModule} from '@nestjs/testing'
import {plainToInstance} from 'class-transformer'

import {MessageDto} from '@/messages/dto/message.dto'
import {createMessagesMockService} from '@/messages/services/messages/message.service.mock'
import {MessagesService} from '@/messages/services/messages/messages.service'
import {RoomsService} from '@/rooms/services/rooms/rooms.service'
import {createRoomsMockService} from '@/rooms/services/rooms/rooms.service.mock'
import {messageMock} from '@/storage/repositories/message/message.repository.mock'
import {roomMock} from '@/storage/repositories/room/room.repository.mock'
import {userMock} from '@/storage/repositories/user/user.repository.mock'

import {RoomsController} from './rooms.controller'

describe('RoomsController', () => {
  let controller: RoomsController

  const messagesServiceMock = createMessagesMockService()

  const eventEmitterMock = {
    addListener: mock.fn(),
    emit: mock.fn(),
    on: mock.fn(),
    removeListener: mock.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsService,
          useValue: createRoomsMockService(),
        },
        {
          provide: MessagesService,
          useValue: messagesServiceMock,
        },
        {
          provide: EventEmitter2,
          useValue: eventEmitterMock,
        },
      ],
    }).compile()

    controller = module.get<RoomsController>(RoomsController)
  })

  afterEach(() => {
    mock.restoreAll()
  })

  it('should be defined', () => {
    ok(controller)
  })

  it('should emit created message', async () => {
    messagesServiceMock.create.mock.mockImplementation((data) => ({
      id: messageMock.id,
      room: roomMock,
      text: data.text,
      user: userMock,
    }))

    await controller.createMessage(
      roomMock.id,
      {email: messageMock.user.email, sub: messageMock.user.id},
      {text: messageMock.text}
    )

    deepEqual(eventEmitterMock.emit.mock.calls[0].arguments, [
      `room.[${roomMock.id}].message`,
      plainToInstance(MessageDto, {
        id: messageMock.id,
        room: roomMock,
        text: messageMock.text,
        user: userMock,
      }),
    ])
  })

  it('should emit message when subscribed to sse', async () => {
    let rxHandler
    eventEmitterMock.addListener.mock.mockImplementationOnce(
      (__, _rxHandler) => {
        rxHandler = _rxHandler
      }
    )
    eventEmitterMock.emit.mock.mockImplementationOnce((event, message) => {
      rxHandler(message)
    })

    const observable = controller.subscribeMessages(roomMock.id, authMock)
    const waitForEvent = new Promise((resolve) => {
      observable.subscribe((message) => {
        resolve(message)
      })
    })

    const sender = {
      email: 'sender',
      sub: 88,
    }
    const TEXT = messageMock.text
    const createdMessageMock = {
      id: messageMock.id,
      room: roomMock,
      text: TEXT,
      user: {email: sender.email, id: sender.sub},
    }
    messagesServiceMock.create.mock.mockImplementation(() => createdMessageMock)

    await controller.createMessage(roomMock.id, sender, {
      text: TEXT,
    })
    const emitted = await waitForEvent

    deepEqual(emitted, {
      data: plainToInstance(MessageDto, createdMessageMock),
    })
  })

  it('should not emit message when sender same as receiver', async () => {
    let rxHandler
    eventEmitterMock.addListener.mock.mockImplementationOnce(
      (__, _rxHandler) => {
        rxHandler = _rxHandler
      }
    )
    eventEmitterMock.emit.mock.mockImplementationOnce((__, message) => {
      rxHandler(message)
    })

    const observable = controller.subscribeMessages(roomMock.id, authMock)
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

    const sender = authMock
    const TEXT = messageMock.text
    const createdMessageMock = {
      id: messageMock.id,
      room: roomMock,
      text: TEXT,
      user: {email: sender.email, id: sender.sub},
    }
    messagesServiceMock.create.mock.mockImplementation(() => createdMessageMock)

    await controller.createMessage(roomMock.id, sender, {
      text: messageMock.text,
    })

    try {
      await waitForEvent
      throw Error('MESSAGE_EMITTED')
    } catch (error) {
      deepEqual(error, MESSAGE_NOT_EMIT_ERROR)
    }
  })
})
