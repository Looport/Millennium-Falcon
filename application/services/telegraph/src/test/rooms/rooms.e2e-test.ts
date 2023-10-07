import {ok} from 'node:assert/strict'
import {describe, it, beforeEach} from 'node:test'

import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import request from 'supertest'

import {AppModule} from '@/app/app.module'
import {FAKE_TOKEN} from '@/test/common/token.constants'

describe('RoomsController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  describe('/rooms (POST)', () => {
    it('should create and return room', async () => {
      const {body} = await request(app.getHttpServer())
        .post('/rooms')
        .set('Authorization', `Bearer ${FAKE_TOKEN}`)
        .expect(201)

      ok(body.id)
      ok(body.url)
    })
  })
})
