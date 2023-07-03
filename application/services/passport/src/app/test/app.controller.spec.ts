import {ok} from 'node:assert'
import {describe, it, beforeEach} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {AppController} from '../app.controller'

describe('AppController', () => {
  let controller: AppController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    controller = module.get<AppController>(AppController)
  })

  it('should be defined', () => {
    ok(controller)
  })
})
