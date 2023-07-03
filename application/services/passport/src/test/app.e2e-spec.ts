import {describe, it, beforeEach} from 'node:test'

import {INestApplication} from '@nestjs/common'
import {Test, TestingModule} from '@nestjs/testing'
import request from 'supertest'

import {AppModule} from '@/app/app.module'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  it('app/status (GET)', () =>
    request(app.getHttpServer())
      .get('/app/status')
      .expect(200)
      .expect({status: 'ok'}))
})
