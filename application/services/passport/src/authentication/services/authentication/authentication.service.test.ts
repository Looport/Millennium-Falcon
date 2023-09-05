import {deepEqual, ok, rejects} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {JwtService} from '@nestjs/jwt'
import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'

import {
  EMAIL_ALREADY_EXISTS_MESSAGE,
  EMAIL_FIELD_KEY,
  INVALID_LOGIN_CREDENTIALS_MESSAGE,
} from '@/authentication/services/authentication/constants'
import {
  createPasswordServiceMock,
  FAKE_PASSWORD_HASH,
} from '@/authentication/services/password-hash/password-hash-mock.service'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {createJwtServiceMock} from '@/authentication/test/jwt.service.mock'
import {ValidationException} from '@/common/exeptions/validation.exeption/validation.exception'
import {
  createUserRepositoryMock,
  FAKE_USER_ID,
  userMock,
} from '@/user/entities/user/user-mock.repository'
import {UserEntity} from '@/user/entities/user/user.entity'

import {AuthenticationService} from './authentication.service'

describe('AuthenticationService', () => {
  let service: AuthenticationService

  const jwtServiceMock = createJwtServiceMock()
  const userRepositoryMock = createUserRepositoryMock()
  const passwordHashServiceMock = createPasswordServiceMock()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: PasswordHashService,
          useValue: passwordHashServiceMock,
        },
        {
          provide: getRepositoryToken(UserEntity),
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

    it('should return token', async () => {
      userRepositoryMock.findOne.mock.mockImplementation(() =>
        Promise.resolve(null)
      )

      const result = await service.register(validCredentials)

      ok(result.accessToken)
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

    it('should return token', async () => {
      const result = await service.login(validCredentials)

      ok(result.accessToken)
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
