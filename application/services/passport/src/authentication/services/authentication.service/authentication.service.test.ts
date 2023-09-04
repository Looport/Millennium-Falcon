import {deepEqual, notEqual, ok, rejects} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {JwtService} from '@nestjs/jwt'
import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'

import {AuthenticationService} from './authentication.service'

import {PasswordHashService} from '@/authentication/services/password-hash.service/password-hash.service'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {
  createJwtServiceMock,
} from '@/authentication/test/jwt.service.mock'
import {
  createPasswordServiceMock
} from '@/authentication/services/password-hash.service/password-hash-service.mock'
import {ValidationException} from '@/common/exeptions/validation.exception'
import {UserEntity} from '@/user/entities/user.entity'
import {
  createUserRepositoryMock,
  FAKE_USER_ID,
} from '@/user/test/user.repository.mock'

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
      mock.reset()
    })

    it('should return token', async () => {
      const result = await service.register(validCredentials)

      deepEqual(result, {accessToken: await jwtServiceMock.signAsync.mock.calls[0].result})
    })

    it('should hash password', async () => {
      const {save} = createUserRepositoryMock({
        save: mock.fn((data) => Promise.resolve({id: FAKE_USER_ID, ...data})),
      })
      userRepositoryMock.save = save

      await service.register(validCredentials)

      deepEqual(passwordHashServiceMock.createHash.mock.calls[0].arguments, [validCredentials.password])
      ok(!(save.mock.calls[0].arguments[0] as any).password)
      notEqual(
        await save.mock.calls[0].result,
        (save.mock.calls[0].arguments as any).passwordHash
      )
    })

    it('should throw error on email already exists', async () => {
      const {findOne} = createUserRepositoryMock({
        findOne: mock.fn((data) =>
          Promise.resolve({id: FAKE_USER_ID, ...data})
        ),
      })
      userRepositoryMock.findOne = findOne

      await rejects(
        service.register(validCredentials),
        new ValidationException([
          {
            field: 'email',
            messages: ['email already exists'],
            value: validCredentials.email,
          },
        ])
      )
    })
  })
})
