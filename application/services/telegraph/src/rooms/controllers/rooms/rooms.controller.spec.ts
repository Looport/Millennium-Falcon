import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {RoomsController} from './rooms.controller'

describe('RoomsController', () => {
  let controller: RoomsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
    }).compile()

    controller = module.get<RoomsController>(RoomsController)
  })

  it('should be defined', () => {
    ok(controller)
  })
})
