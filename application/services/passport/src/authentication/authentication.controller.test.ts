import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {ClientProxy} from '@nestjs/microservices'
import {Test} from '@nestjs/testing'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {createAuthenticationServiceMock} from '@/authentication/services/authentication/authentication-mock.service'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {userMock} from '@/storage/repositories/user/user-mock.repository'

type NatsMockService = {
  [method in keyof ClientProxy]: ReturnType<(typeof mock)['fn']>
}

export const createNATSMockService = (
  spies?: Partial<NatsMockService>
): Partial<NatsMockService> => {
  const emit = mock.fn()
  const send = mock.fn()

  return {
    emit,
    send,
    ...spies,
  }
}

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
          provide: 'NATS_CLIENT',
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
