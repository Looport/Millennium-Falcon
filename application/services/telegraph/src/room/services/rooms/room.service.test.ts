import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {createRoomRepositoryMock} from '@/storage/repositories/room/room.repository.mock'

import {RoomService} from './room.service'

describe('RoomService', () => {
  let service: RoomService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {provide: RoomRepository, useValue: createRoomRepositoryMock()},
      ],
    }).compile()

    service = module.get<RoomService>(RoomService)
  })

  it('should be defined', () => {
    ok(service)
  })
})
