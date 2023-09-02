import {deepEqual, notEqual, ok, rejects} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it, mock} from 'node:test'

import {JwtService} from '@nestjs/jwt'
import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {AuthenticationService} from './authentication.service'

import {PasswordHashService} from '@/authentication/services/password-hash.service/password-hash.service'
import {
  FAKE_PASSWORD_HASH,
  FAKE_TOKEN,
  FAKE_USER_ID,
  validCredentials,
} from '@/authentication/test/authentication.mocks'
import {ValidationException} from '@/common/exeptions/validation.exception'
import {UserEntity} from '@/user/entities/user.entity'

describe('AuthenticationService', () => {
  let service: AuthenticationService
  let jwtService: JwtService
  let passwordHashService: PasswordHashService
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: JwtService,
          useValue: {
            signAsync: mock.fn(() => Promise.resolve(FAKE_TOKEN)),
          },
        },
        {
          provide: PasswordHashService,
          useValue: {
            createHash: mock.fn(() => Promise.resolve(FAKE_PASSWORD_HASH)),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: mock.fn((data) => data),
            findOne: () => null,
            save: mock.fn((data) =>
              Promise.resolve({id: FAKE_USER_ID, ...data})
            ),
          },
        },
      ],
    }).compile()

    service = module.get<AuthenticationService>(AuthenticationService)
    jwtService = module.get<JwtService>(JwtService)
    passwordHashService = module.get<PasswordHashService>(PasswordHashService)
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    )
  })

  describe('register', () => {
    afterEach(() => {
      mock.reset()
    })

    it('should return token', async () => {
      const result = await service.register(validCredentials)

      deepEqual(result, {accessToken: FAKE_TOKEN})
    })

    it('should hash password', async () => {
      const savedUser = await (userRepository.save as any).mock.calls[0].result

      ok(savedUser.passwordHash)
      notEqual(validCredentials.password, savedUser.passwordHash)
    })

    it('should throw error on email already exists', async () => {
      userRepository.findOne = mock.fn(userRepository.findOne, () =>
        Promise.resolve({id: FAKE_USER_ID, ...validCredentials})
      ) as any

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
