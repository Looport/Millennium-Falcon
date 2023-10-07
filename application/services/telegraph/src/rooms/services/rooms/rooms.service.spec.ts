import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {RoomsService} from './rooms.service'

describe('RoomsServiceService', () => {
  let service: RoomsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService],
    }).compile()

    service = module.get<RoomsService>(RoomsService)
  })

  it('should be defined', () => {
    ok(service)
  })
})
