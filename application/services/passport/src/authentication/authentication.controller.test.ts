import {ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {Test} from '@nestjs/testing'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {createAuthenticationServiceMock} from '@/authentication/services/authentication/authentication-mock.service'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {validCredentials} from '@/authentication/test/authentication.mock'

describe('AuthenticationController', () => {
  let controller: AuthenticationController

  const authenticationServiceMock = createAuthenticationServiceMock()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock,
        },
      ],
    }).compile()

    controller = module.get<AuthenticationController>(AuthenticationController)
  })

  describe('register', () => {
    afterEach(() => {
      mock.reset()
    })

    it('should return token', async () => {
      const result = await controller.register(validCredentials)

      ok(result.accessToken)
    })
  })

  describe('login', () => {
    afterEach(() => {
      mock.reset()
    })

    it('should return token', async () => {
      const result = await controller.login(validCredentials)

      ok(result.accessToken)
    })
  })
})
