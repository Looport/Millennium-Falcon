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
    it('returns token', async () => {
      const credentials = {
        email: 'elliot@e-corp.com',
        password: 'Xjied**33#ppC',
      }
      const {body} = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(credentials)
        .expect(201)

      deepEqual(body, {
        accessToken: body.accessToken,
      })

      const payload = await jwtService.verifyAsync(body.accessToken)

      ok(payload.id)
      equal(credentials.email, payload.email)
      ok(!payload.password)
    })

    it('save user and hash password', async () => {
      const credentials = {
        email: 'elliot@e-corp.com',
        password: 'Xjied**33#ppC',
      }

      await request(app.getHttpServer())
        .post('/authentication/register')
        .send(credentials)

      const user = await userRepository.findOne({
        where: {email: credentials.email},
      })

      ok(user)
      equal(user.email, credentials.email)
      notEqual(user.passwordHash, credentials.password)
    })
  })
})
