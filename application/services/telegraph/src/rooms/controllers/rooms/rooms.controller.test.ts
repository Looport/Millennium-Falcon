import {deepEqual, equal, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {EventEmitter2} from '@nestjs/event-emitter'
import {Test, TestingModule} from '@nestjs/testing'

import {createMessagesMockService} from '@/messages/services/messages/message.service.mock'
import {MessagesService} from '@/messages/services/messages/messages.service'
import {RoomsService} from '@/rooms/services/rooms/rooms.service'
import {createRoomsMockService} from '@/rooms/services/rooms/rooms.service.mock'
import {messageMock} from '@/storage/repositories/message/message.repository.mock'
import {roomMock} from '@/storage/repositories/room/room.repository.mock'

import {RoomsController} from './rooms.controller'

describe('RoomsController', () => {
  let controller: RoomsController

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
          useValue: createMessagesMockService(),
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
    await controller.createMessage(
      roomMock.id,
      {email: messageMock.user.email, sub: messageMock.user.id},
      {text: messageMock.text}
    )
    deepEqual(eventEmitterMock.emit.mock.calls[0].arguments, [
      `room.[${roomMock.id}].message`,
      {
        id: messageMock.id,
        roomId: messageMock.room.id,
        text: messageMock.text,
        userId: messageMock.user.id,
      },
    ])
  })

  it('should emit message when subscribed to sse', async () => {
    let handler
    eventEmitterMock.addListener.mock.mockImplementation((_, rxHandler) => {
      handler = rxHandler
      return {
        off: mock.fn(),
      }
    })
    let emittedEvent
    eventEmitterMock.emit.mock.mockImplementation((event, message) => {
      emittedEvent = event
      handler(message)
    })

    const subscriber = controller.subscribeMessages(roomMock.id)
    const subPromise = new Promise((resolve) => {
      subscriber.subscribe((message) => {
        resolve(message)
      })
    })

    await controller.createMessage(
      roomMock.id,
      {email: messageMock.user.email, sub: messageMock.user.id},
      {text: messageMock.text}
    )
    const emitted = await subPromise

    equal(emittedEvent, `room.[${roomMock.id}].message`)
    deepEqual(emitted, {
      data: {
        id: messageMock.id,
        roomId: messageMock.room.id,
        text: messageMock.text,
        userId: messageMock.user.id,
      },
    })
  })
})
