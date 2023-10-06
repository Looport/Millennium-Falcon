import {deepEqual, equal, notEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it} from 'node:test'

import {TokenService} from '@looport/nest-auth'
import {VALIDATION_EXCEPTION_MESSAGE} from '@looport/nest-common'
import {createNatsMockService, NatsService} from '@looport/nest-microservices'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import request from 'supertest'

import {AppModule} from '@/app/app.module'
import {
  EMAIL_ALREADY_EXISTS_MESSAGE,
  EMAIL_FIELD_KEY,
  INVALID_LOGIN_CREDENTIALS_MESSAGE,
} from '@/authentication/services/authentication/authentication.service.constants'
import {
  invalidCredentials,
  validCredentials,
} from '@/authentication/services/authentication/authentication.service.mock'
import {UserRepository} from '@/storage/repositories/user/user.repository'

describe('AuthenticationController (e2e)', () => {
  let app: NestFastifyApplication

  let tokenService: TokenService
  let userRepository: UserRepository

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(NatsService)
      .useValue(createNatsMockService())
      .compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    tokenService = moduleFixture.get<TokenService>(TokenService)
    userRepository = moduleFixture.get<UserRepository>(UserRepository)

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  describe('/authentication/register (POST)', () => {
    afterEach(async () => {
      await userRepository.delete({})
    })

    it('should return only token', async () => {
      const {body} = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(201)

      deepEqual(body, {
        accessToken: body.accessToken,
      })

      // verify token payload
      const payload = await tokenService.unwrap(body.accessToken)

      ok(payload.sub)
      equal(validCredentials.email, payload.email)
      ok(!(payload as any).password)
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
        message: VALIDATION_EXCEPTION_MESSAGE,
      })
    })

    it('should throw validation error when email already exists', async () => {
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
        message: VALIDATION_EXCEPTION_MESSAGE,
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

      const payload = await tokenService.unwrap(body.accessToken)

      ok(payload.sub)
      equal(validCredentials.email, payload.email)
      ok(!(payload as any).password)
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
        message: VALIDATION_EXCEPTION_MESSAGE,
      })
    })

    it("should throw validation error when user don't exist", async () => {
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
        message: VALIDATION_EXCEPTION_MESSAGE,
      })
    })
  })
})
