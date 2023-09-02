import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test} from '@nestjs/testing'

import {UserController} from './user.controller'

describe('UserController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    ok(controller)
  })
})
