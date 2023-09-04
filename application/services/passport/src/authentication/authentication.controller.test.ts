import {deepEqual} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {Test} from '@nestjs/testing'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {AuthenticationService} from '@/authentication/services/authentication.service/authentication.service'
import {
  FAKE_TOKEN,
  validCredentials,
} from '@/authentication/test/authentication.mock'

describe('AuthenticationController', () => {
  let controller: AuthenticationController
  let authenticationService: AuthenticationService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            register: mock.fn(() => Promise.resolve({accessToken: FAKE_TOKEN})),
          },
        },
      ],
    }).compile()

    controller = module.get<AuthenticationController>(AuthenticationController)
    authenticationService = module.get<AuthenticationService>(
      AuthenticationService
    )
  })

  afterEach(() => {
    mock.reset()
  })

  describe('register', () => {
    it('returns token', async () => {
      const result = await controller.register(validCredentials)

      const registerCalls = await (authenticationService.register as any).mock
        .calls

      deepEqual(registerCalls[0].arguments, [validCredentials])

      deepEqual(await registerCalls[0].result, {
        accessToken: FAKE_TOKEN,
      })
      deepEqual(result, {accessToken: FAKE_TOKEN})
    })
  })
})
