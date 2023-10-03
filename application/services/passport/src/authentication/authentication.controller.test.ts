import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {createNATSMockService, NATSService} from '@looport/nats'
import {Test} from '@nestjs/testing'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {createAuthenticationServiceMock} from '@/authentication/services/authentication/authentication-mock.service'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {userMock} from '@/user/entities/user/user-mock.repository'

describe('AuthenticationController', () => {
  let controller: AuthenticationController

  const authenticationServiceMock = createAuthenticationServiceMock()
  const natsServiceMock = createNATSMockService()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock,
        },
        {
          provide: NATSService,
          useValue: natsServiceMock,
        },
      ],
    }).compile()

    controller = module.get<AuthenticationController>(AuthenticationController)
  })

  describe('register', () => {
    afterEach(() => {
      mock.restoreAll()
    })

    it('should return token', async () => {
      const result = await controller.register(validCredentials)

      ok(result.accessToken)
    })

    it('should emit user reregistration event', async () => {
      await controller.register(validCredentials)

      deepEqual(
        ['passport.user.registered', userMock],
        natsServiceMock.send.mock.calls[0].arguments
      )
    })
  })

  describe('login', () => {
    afterEach(() => {
      mock.restoreAll()
    })

    it('should return token', async () => {
      const result = await controller.login(validCredentials)

      ok(result.accessToken)
    })
  })
})
