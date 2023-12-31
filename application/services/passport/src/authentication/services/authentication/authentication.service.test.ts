import {deepEqual, ok, rejects} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {createTokenServiceMock, TokenService} from '@looport/nest-auth'
import {ValidationException} from '@looport/nest-common'
import {Test} from '@nestjs/testing'

import {
  EMAIL_ALREADY_EXISTS_MESSAGE,
  EMAIL_FIELD_KEY,
  INVALID_LOGIN_CREDENTIALS_MESSAGE,
} from '@/authentication/services/authentication/authentication.service.constants'
import {validCredentials} from '@/authentication/services/authentication/authentication.service.mock'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {
  createPasswordMockService,
  FAKE_PASSWORD_HASH,
} from '@/authentication/services/password-hash/password-hash.service.mock'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {
  createUserMockRepository,
  FAKE_USER_ID,
} from '@/storage/repositories/user/user.repository.mock'

import {AuthenticationService} from './authentication.service'

describe('AuthenticationService', () => {
  let service: AuthenticationService

  const tokenService = createTokenServiceMock()
  const userRepositoryMock = createUserMockRepository()
  const passwordHashServiceMock = createPasswordMockService()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: TokenService,
          useValue: tokenService,
        },
        {
          provide: PasswordHashService,
          useValue: passwordHashServiceMock,
        },
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile()

    service = module.get<AuthenticationService>(AuthenticationService)
  })

  describe('register', () => {
    afterEach(() => {
      mock.restoreAll()
    })

    it('should return token and user', async () => {
      userRepositoryMock.findOne.mock.mockImplementation(() =>
        Promise.resolve(null)
      )

      const result = await service.register(validCredentials)

      ok(result.accessToken)
      ok(result.user)
    })

    it('should hash password', async () => {
      userRepositoryMock.findOne.mock.mockImplementation(() =>
        Promise.resolve(null)
      )
      passwordHashServiceMock.createHash.mock.mockImplementation(
        () => FAKE_PASSWORD_HASH
      )
      userRepositoryMock.save.mock.mockImplementation((data) =>
        Promise.resolve({id: FAKE_USER_ID, ...data})
      )

      await service.register(validCredentials)

      deepEqual(passwordHashServiceMock.createHash.mock.calls[0].arguments, [
        validCredentials.password,
      ])

      ok(
        (userRepositoryMock.save.mock.calls[0].arguments[0] as any).passwordHash
      )
      ok(!(userRepositoryMock.save.mock.calls[0].arguments[0] as any).password)
    })

    it('should throw error when email already exists', async () => {
      await rejects(
        service.register(validCredentials),
        new ValidationException([
          {
            field: EMAIL_FIELD_KEY,
            messages: [EMAIL_ALREADY_EXISTS_MESSAGE],
            value: validCredentials.email,
          },
        ])
      )
    })
  })

  describe('login', () => {
    afterEach(() => {
      mock.restoreAll()
    })

    it('should return token and user', async () => {
      const result = await service.login(validCredentials)

      ok(result.accessToken)
      ok(result.user)
    })

    it("should throw error when user don't exist", async () => {
      userRepositoryMock.findOne.mock.mockImplementation(() =>
        Promise.resolve(null)
      )

      await rejects(
        service.login(validCredentials),
        new ValidationException([
          {
            field: EMAIL_FIELD_KEY,
            messages: [INVALID_LOGIN_CREDENTIALS_MESSAGE],
            value: validCredentials.email,
          },
        ])
      )
    })

    it('should throw error when invalid password', async () => {
      passwordHashServiceMock.validatePassword.mock.mockImplementation(() =>
        Promise.resolve(false)
      )

      await rejects(
        service.login({
          ...validCredentials,
          password: `${validCredentials.password}_wrong`,
        }),
        new ValidationException([
          {
            field: EMAIL_FIELD_KEY,
            messages: [INVALID_LOGIN_CREDENTIALS_MESSAGE],
            value: validCredentials.email,
          },
        ])
      )
    })
  })
})
