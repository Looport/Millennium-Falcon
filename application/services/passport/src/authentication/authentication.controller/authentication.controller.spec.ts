import {deepEqual} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {Test} from '@nestjs/testing'

import {AuthenticationController} from '@/authentication/authentication.controller/authentication.controller'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'

const FAKE_TOKEN = 'FAKE_TOKEN'

describe('AuthenticationController', () => {
  let controller: AuthenticationController
  let authenticationService: AuthenticationService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile()

    controller = module.get<AuthenticationController>(AuthenticationController)
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService
    )
  })

  afterEach(() => {
    mock.restoreAll()
  })

  describe('register', () => {
    it('returns token', async () => {
      authenticationService.register = mock.fn(() =>
        Promise.resolve({accessToken: FAKE_TOKEN})
      )

      const credentials = {email: 'elliot@e-corp.com', password: 'weiofj'}

      const result = await controller.register(credentials)

      deepEqual((authenticationService.register as any).mock.calls[0].result, {
        accessToken: FAKE_TOKEN,
      })
      deepEqual(result, {accessToken: FAKE_TOKEN})
    })
  })
})
