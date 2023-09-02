import {deepEqual, ok} from 'node:assert/strict'
import {describe, it, beforeEach} from 'node:test'

import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import request from 'supertest'

import {AppModule} from '@/app/app.module'

describe('AuthenticationController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

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

      ok(typeof body.accessToken === 'string')
    })

    it.todo('save user and hash password', async () => {})

    it.todo('reject on email duplication', async () => {})

    it.todo('reject on invalid credentials', async () => {})
  })
})
