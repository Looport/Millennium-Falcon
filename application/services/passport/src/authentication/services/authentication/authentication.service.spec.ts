import {ok} from 'node:assert/strict'
import {describe, it, beforeEach} from 'node:test'

import {Test} from '@nestjs/testing'

import {AuthenticationService} from './authentication.service'

describe('AuthenticationService', () => {
  let service: AuthenticationService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile()

    service = module.get<AuthenticationService>(AuthenticationService)
  })

  it('should be defined', () => {
    ok(service)
  })
})
