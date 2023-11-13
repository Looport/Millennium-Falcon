import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {MessageRepository} from '@/storage/repositories/message/message.repository'
import {createMessageRepositoryMock} from '@/storage/repositories/message/message.repository.mock'
import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {createRoomRepositoryMock} from '@/storage/repositories/room/room.repository.mock'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {createUserRepositoryMock} from '@/storage/repositories/user/user.repository.mock'

import {MessageService} from './message.service'

describe('MessageService', () => {
  let service: MessageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: RoomRepository,
          useValue: createRoomRepositoryMock(),
        },
        {
          provide: UserRepository,
          useValue: createUserRepositoryMock(),
        },
        {
          provide: MessageRepository,
          useValue: createMessageRepositoryMock(),
        },
      ],
    }).compile()

    service = module.get<MessageService>(MessageService)
  })

  it('should be defined', () => {
    ok(service)
  })
})
