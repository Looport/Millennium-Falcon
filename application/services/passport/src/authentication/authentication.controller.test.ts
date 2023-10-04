import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {Test} from '@nestjs/testing'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {createAuthenticationMockService} from '@/authentication/services/authentication/authentication-mock.service'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {createNatsMockService} from '@/microservices/services/nats/nats-mock.service'
import {NatsService} from '@/microservices/services/nats/nats.service'
import {userMock} from '@/storage/repositories/user/user-mock.repository'

describe('AuthenticationController', () => {
  let controller: AuthenticationController

  const authenticationServiceMock = createAuthenticationMockService()
  const natsServiceMock = createNatsMockService()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock,
        },
        {
          provide: NatsService,
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
        natsServiceMock.emit.mock.calls[0].arguments
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
