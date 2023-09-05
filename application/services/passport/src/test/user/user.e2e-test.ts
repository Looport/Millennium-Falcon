import {deepEqual, ok} from 'node:assert/strict'
import {describe, beforeEach, it, afterEach} from 'node:test'

import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'
import request from 'supertest'
import {Repository} from 'typeorm'

import {AppModule} from '@/app/app.module'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {UserEntity} from '@/user/entities/user/user.entity'

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication

  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    userRepository = moduleFixture.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    )

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
