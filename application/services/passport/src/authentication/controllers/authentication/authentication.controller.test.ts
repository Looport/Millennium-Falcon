import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {createNatsServiceMock, NatsService} from '@looport/nest-microservice'
import {Test} from '@nestjs/testing'

import {AuthenticationController} from '@/authentication/controllers/authentication/authentication.controller'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {
  createAuthenticationMockService,
  validCredentials,
} from '@/authentication/services/authentication/authentication.service.mock'
import {userMock} from '@/storage/repositories/user/user.repository.mock'

describe('AuthenticationController', () => {
  let controller: AuthenticationController

  const authenticationServiceMock = createAuthenticationMockService()
  const natsServiceMock = createNatsServiceMock()

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
