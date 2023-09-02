import {describe, beforeEach, it} from 'node:test'

import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'

import {AppModule} from '@/app/app.module'

describe('UserController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  describe('/user/iam (GET)', () => {
    it.todo('returns authenticated user by token', async () => {})
  })
})
