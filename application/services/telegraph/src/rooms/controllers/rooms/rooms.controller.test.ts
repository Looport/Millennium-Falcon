import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {createMessagesMockService} from '@/messages/services/messages/message.service.mock'
import {MessagesService} from '@/messages/services/messages/messages.service'
import {RoomsService} from '@/rooms/services/rooms/rooms.service'
import {createRoomsMockService} from '@/rooms/services/rooms/rooms.service.mock'

import {RoomsController} from './rooms.controller'

describe('RoomsController', () => {
  let controller: RoomsController

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
      ],
    }).compile()

    controller = module.get<RoomsController>(RoomsController)
  })

  it('should be defined', () => {
    ok(controller)
  })
})
