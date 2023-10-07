import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {MessageRepository} from '@/storage/repositories/message/message.repository'
import {createMessageMockRepository} from '@/storage/repositories/message/message.repository.mock'
import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {createRoomMockRepository} from '@/storage/repositories/room/room.repository.mock'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {createUserMockRepository} from '@/storage/repositories/user/user.repository.mock'

import {MessagesService} from './messages.service'

describe('MessagesService', () => {
  let service: MessagesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: RoomRepository,
          useValue: createRoomMockRepository(),
        },
        {
          provide: UserRepository,
          useValue: createUserMockRepository(),
        },
        {
          provide: MessageRepository,
          useValue: createMessageMockRepository(),
        },
      ],
    }).compile()

    service = module.get<MessagesService>(MessagesService)
  })

  it('should be defined', () => {
    ok(service)
  })
})
