import {deepEqual, ok, rejects} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {JwtService} from '@nestjs/jwt'
import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'

import {AuthenticationService} from './authentication.service'

import {
  EMAIL_ALREADY_EXISTS_MESSAGE,
  EMAIL_FIELD_KEY,
  INVALID_LOGIN_CREDENTIALS_MESSAGE,
} from '@/authentication/services/authentication.service/constants'
import {
  createPasswordServiceMock,
  FAKE_PASSWORD_HASH,
} from '@/authentication/services/password-hash.service/password-hash-mock.service'
import {PasswordHashService} from '@/authentication/services/password-hash.service/password-hash.service'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {createJwtServiceMock} from '@/authentication/test/jwt.service.mock'
import {ValidationException} from '@/common/exeptions/validation.exeption/validation.exception'
import {
  createUserRepositoryMock,
  FAKE_USER_ID,
  userMock,
} from '@/user/entities/user.entity/user-mock.repository'
import {UserEntity} from '@/user/entities/user.entity/user.entity'

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
      const {findOne} = createUserRepositoryMock({
        findOne: mock.fn(() => Promise.resolve(null)),
      })
      userRepositoryMock.findOne = findOne

      const result = await service.register(validCredentials)

      ok(result.accessToken)
    })

    it('should hash password', async () => {
      const {findOne} = createUserRepositoryMock({
        findOne: mock.fn(() => Promise.resolve(null)),
      })
      userRepositoryMock.findOne = findOne

      const {createHash} = createPasswordServiceMock({
        createHash: mock.fn(() => FAKE_PASSWORD_HASH),
      })
      passwordHashServiceMock.createHash = createHash

      const {save} = createUserRepositoryMock({
        save: mock.fn((data) => Promise.resolve({id: FAKE_USER_ID, ...data})),
      })
      userRepositoryMock.save = save

      await service.register(validCredentials)

      deepEqual(passwordHashServiceMock.createHash.mock.calls[0].arguments, [
        validCredentials.password,
      ])

      ok((save.mock.calls[0].arguments[0] as any).passwordHash)
      ok(!(save.mock.calls[0].arguments[0] as any).password)
    })

    it('should throw error on email already exists', async () => {
      const {findOne} = createUserRepositoryMock()
      userRepositoryMock.findOne = findOne

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
      mock.reset()
    })

    it('should return token', async () => {
      const {findOne} = createUserRepositoryMock({
        findOne: mock.fn(userRepositoryMock.findOne, () =>
          Promise.resolve(userMock)
        ),
      })
      userRepositoryMock.findOne = findOne

      const {validatePassword} = createPasswordServiceMock({
        validatePassword: mock.fn(() => Promise.resolve(true)),
      })
      passwordHashServiceMock.validatePassword = validatePassword

      const result = await service.login(validCredentials)

      ok(result.accessToken)
    })

    it("should throw error on user don't exist", async () => {
      const {findOne} = createUserRepositoryMock({
        findOne: mock.fn(userRepositoryMock.findOne, () =>
          Promise.resolve(null)
        ),
      })
      userRepositoryMock.findOne = findOne

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

    it('should throw error on invalid password', async () => {
      const {findOne} = createUserRepositoryMock({
        findOne: mock.fn(userRepositoryMock.findOne, () =>
          Promise.resolve(validCredentials)
        ),
      })
      userRepositoryMock.findOne = findOne

      const {validatePassword} = createPasswordServiceMock({
        validatePassword: mock.fn(() => Promise.resolve(false)),
      })
      passwordHashServiceMock.validatePassword = validatePassword

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
