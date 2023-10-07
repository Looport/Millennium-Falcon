import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {createRoomMockRepository} from '@/storage/repositories/room/room.repository.mock'

import {RoomsService} from './rooms.service'

describe('RoomsService', () => {
  let service: RoomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {provide: RoomRepository, useValue: createRoomMockRepository()},
      ],
    }).compile()

    service = module.get<RoomsService>(RoomsService)
  })

  it('should be defined', () => {
    ok(service)
  })
})
