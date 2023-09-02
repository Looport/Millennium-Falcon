import {deepEqual, ok, notEqual, equal} from 'node:assert/strict'
import {describe, it, beforeEach} from 'node:test'

import {JwtService} from '@nestjs/jwt'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import request from 'supertest'
import {Repository} from 'typeorm'

import {AppModule} from '@/app/app.module'
import {UserEntity} from '@/user/entities/user.entity'
import {invalidCredentials, validCredentials} from "@/authentication/test/authentication.mocks";

describe('AuthenticationController (e2e)', {only: true}, () => {
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
    it('should return token', async () => {
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

    it.only('should throw validation error', async () => {
      const {body} = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(invalidCredentials)
        .expect(400)

      deepEqual(body, {
        message: 'Validation',
        errors: [
          {
            "field": "email",
            "value": "elliot",
            "messages": [
              "email must be an email"
            ],
            children: []
          },
          {
            "field": "password",
            "value": "oj(3",
            "messages": [
              "password must be longer than or equal to 6 characters"
            ],
            children: []
          }
        ]
      })
    })
  })
})
