import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it} from 'node:test'

import {createNatsMockService, NatsService} from '@looport/nest-microservices'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import request from 'supertest'

import {AppModule} from '@/app/app.module'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {UserRepository} from '@/storage/repositories/user/user.repository'

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication

  let userRepository: UserRepository

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(NatsService)
      .useValue(createNatsMockService())
      .compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    userRepository = moduleFixture.get<UserRepository>(UserRepository)

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  describe('/user/iam (GET)', () => {
    beforeEach(async () => {
      await userRepository.delete({})
    })

    afterEach(async () => {
      await userRepository.delete({})
    })

    it('should return authenticated user by token', async () => {
      const {
        body: {accessToken},
      } = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(201)

      const {
        body: {id, ...user},
      } = await request(app.getHttpServer())
        .get('/user/iam')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

      ok(id)
      deepEqual({email: validCredentials.email}, user)
    })

    it('should return serialized authenticated user by token', async () => {
      const {
        body: {accessToken},
      } = await request(app.getHttpServer())
        .post('/authentication/register')
        .send(validCredentials)
        .expect(201)

      const {body} = await request(app.getHttpServer())
        .get('/user/iam')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

      ok(!body.passwordHash)
    })
  })
})
