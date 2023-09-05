import {ok} from 'node:assert'
import {beforeEach, describe, it} from 'node:test'

import {Test} from '@nestjs/testing'

import {AppController} from './app.controller'

describe('AppController', () => {
  let controller: AppController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    controller = module.get<AppController>(AppController)
  })

  it('should be defined', () => {
    ok(controller)
  })
})
