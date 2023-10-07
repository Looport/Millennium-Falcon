import {ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it} from 'node:test'

import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import request from 'supertest'

import {AppModule} from '@/app/app.module'
import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {
  AuthTestData,
  generateAuthTestData,
} from '@/test/auth/generate-auth-test-data'

describe('RoomsController (e2e)', () => {
  let app: NestFastifyApplication

  let roomRepository: RoomRepository
  let userRepository: UserRepository

  let authTestData: AuthTestData

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    roomRepository = app.get<RoomRepository>(RoomRepository)
    userRepository = app.get<UserRepository>(UserRepository)

    authTestData = await generateAuthTestData(app)

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  describe('/rooms (POST)', () => {
    afterEach(async () => {
      await userRepository.delete({})
      await roomRepository.delete({})
    })

    it('should throw 401 when user not authenticated', async () => {
      await request(app.getHttpServer()).post('/rooms').expect(401)
    })

    it('should create and return room', async () => {
      const {body} = await request(app.getHttpServer())
        .post('/rooms')
        .set('Authorization', `Bearer ${authTestData.token}`)
        .expect(201)

      ok(body.id)
      ok(body.url)
    })
  })
})
