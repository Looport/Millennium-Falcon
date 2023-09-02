import {deepEqual} from 'node:assert/strict'
import {describe, it, beforeEach, afterEach, mock} from 'node:test'

import {JwtService} from '@nestjs/jwt'
import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {AuthenticationService} from '../services/authentication.service'

import {PasswordHashService} from '@/authentication/services/password-hash.service'
import {UserEntity} from '@/user/entities/user.entity'

const FAKE_HASHED_PASSWORD = 'HASHED'
const FAKE_USER_ID = 1
const FAKE_TOKEN = 'FAKE_TOKEN'

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
            createHash: mock.fn(() => Promise.resolve(FAKE_HASHED_PASSWORD)),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: mock.fn((data) => data),
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

  afterEach(() => {
    mock.reset()
  })

  describe('register', () => {
    it('should return token', async () => {
      const credentials = {email: 'elliot@e-corp.com', password: 'weiofj'}

      const result = await service.register(credentials)

      deepEqual(result, {accessToken: result.accessToken})
    })

    it('verify register flow', async () => {
      const credentials = {email: 'elliot@e-corp.com', password: 'weiofj'}

      const result = await service.register(credentials)

      const createHashCalls = await (passwordHashService.createHash as any).mock
        .calls
      deepEqual(createHashCalls[0].arguments, [credentials.password])

      const userRepositoryCreateCalls = await (userRepository.create as any)
        .mock.calls
      deepEqual(userRepositoryCreateCalls[0].arguments, [
        {email: credentials.email, passwordHash: FAKE_HASHED_PASSWORD},
      ])

      const userRepositorySaveCalls = await (userRepository.save as any).mock
        .calls
      deepEqual(userRepositorySaveCalls[0].arguments, [
        {email: credentials.email, passwordHash: FAKE_HASHED_PASSWORD},
      ])

      const jwtSignCalls = await (jwtService.signAsync as any).mock.calls
      deepEqual(jwtSignCalls[0].arguments, [
        {email: credentials.email, id: FAKE_USER_ID},
      ])

      deepEqual(result, {accessToken: FAKE_TOKEN})
    })
  })
})
