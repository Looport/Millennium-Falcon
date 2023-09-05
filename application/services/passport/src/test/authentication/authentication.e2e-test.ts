import {deepEqual, ok, notEqual, equal} from 'node:assert/strict'
import {describe, it, beforeEach, afterEach} from 'node:test'

import {JwtService} from '@nestjs/jwt'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import request from 'supertest'
import {Repository} from 'typeorm'

import {AppModule} from '@/app/app.module'
import {
  EMAIL_ALREADY_EXISTS_MESSAGE,
  EMAIL_FIELD_KEY, INVALID_LOGIN_CREDENTIALS_MESSAGE,
} from '@/authentication/services/authentication.service/constants'
import {
  invalidCredentials,
  validCredentials,
} from '@/authentication/test/authentication.mock'
import {VALIDATION_EXEPTION_MESSAGE} from '@/common/exeptions/validation.exeption/constants'
import {UserEntity} from '@/user/entities/user.entity/user.entity'

describe('AuthenticationController (e2e)', () => {
  let app: NestFastifyApplication

  let jwtService: JwtService
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    jwtService = moduleFixture.get<JwtService>(JwtService)
    userRepository = moduleFixture.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    )

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  describe('/authentication/register (POST)', () => {
    afterEach(async () => {
      await userRepository.delete({})
    })

    it('should return token with respective payload', async () => {
      const {body} = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(201)

      deepEqual(body, {
        accessToken: body.accessToken,
      })

      const payload = await jwtService.verifyAsync(body.accessToken)

      ok(payload.sub)
      equal(validCredentials.email, payload.email)
      ok(!payload.password)
    })

    it('should save user and hash password', async () => {
      await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(201)

      const user = await userRepository.findOne({
        where: {email: validCredentials.email},
      })

      ok(user)

      equal(user.email, validCredentials.email)
      notEqual(user.passwordHash, validCredentials.password)
    })

    it('should throw validation error', async () => {
      const {body} = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(invalidCredentials)
        .expect(400)

      deepEqual(body, {
        errors: [
          {
            children: [],
            field: 'email',
            messages: ['email must be an email'],
            value: invalidCredentials.email,
          },
          {
            children: [],
            field: 'password',
            messages: ['password must be longer than or equal to 6 characters'],
            value: invalidCredentials.password,
          },
        ],
        message: VALIDATION_EXEPTION_MESSAGE,
      })
    })

    it('should throw validation error on email already exists', async () => {
      await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(201)

      const {body} = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(400)

      deepEqual(body, {
        errors: [
          {
            children: [],
            field: EMAIL_FIELD_KEY,
            messages: [EMAIL_ALREADY_EXISTS_MESSAGE],
            value: validCredentials.email,
          },
        ],
        message: VALIDATION_EXEPTION_MESSAGE,
      })
    })
  })

  describe('/authentication/login (POST)', () => {
    afterEach(async () => {
      await userRepository.delete({})
    })

    it('should return token with respective payload', async () => {
      await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(201)

      const {body} = await request(app.getHttpServer())
        .post('/authentication/login')
        .send(validCredentials)
        .expect(200)

      deepEqual(body, {
        accessToken: body.accessToken,
      })

      const payload = await jwtService.verifyAsync(body.accessToken)

      ok(payload.sub)
      equal(validCredentials.email, payload.email)
      ok(!payload.password)
    })

    it('should throw validation error', async () => {
      const {body} = await request(app.getHttpServer())
        .post('/authentication/login')
        .send(invalidCredentials)
        .expect(400)

      deepEqual(body, {
        errors: [
          {
            children: [],
            field: 'email',
            messages: ['email must be an email'],
            value: invalidCredentials.email,
          },
          {
            children: [],
            field: 'password',
            messages: ['password must be longer than or equal to 6 characters'],
            value: invalidCredentials.password,
          },
        ],
        message: VALIDATION_EXEPTION_MESSAGE,
      })
    })

    it('should throw validation error on user don\'t exist', async () => {
      await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(201)

      const {body} = await request(app.getHttpServer())
        .post('/authentication/login')
        .send({...validCredentials, password: `${validCredentials.password}_wrong`})
        .expect(400)

      deepEqual(body, {
        errors: [
          {
            children: [],
            field: EMAIL_FIELD_KEY,
            messages: [INVALID_LOGIN_CREDENTIALS_MESSAGE],
            value: validCredentials.email,
          },
        ],
        message: VALIDATION_EXEPTION_MESSAGE,
      })
    })

    it('should throw validation error on invalid password', async () => {
      const {body} = await request(app.getHttpServer())
        .post('/authentication/login')
        .send(validCredentials)
        .expect(400)

      deepEqual(body, {
        errors: [
          {
            children: [],
            field: EMAIL_FIELD_KEY,
            messages: [INVALID_LOGIN_CREDENTIALS_MESSAGE],
            value: validCredentials.email,
          },
        ],
        message: VALIDATION_EXEPTION_MESSAGE,
      })
    })
  })
})
