import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it} from 'node:test'

import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import {instanceToPlain, plainToClass} from 'class-transformer'
import request from 'supertest'

import {AppModule} from '@/app/app.module'
import {MessageDto} from '@/messages/dto/message.dto'
import {RoomsService} from '@/rooms/services/rooms/rooms.service'
import {MessageRepository} from '@/storage/repositories/message/message.repository'
import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {
  AuthTestData,
  generateAuthTestData,
} from '@/test/auth/generate-auth-test-data'

describe('RoomsController (e2e)', () => {
  let app: NestFastifyApplication

  let userRepository: UserRepository
  let roomRepository: RoomRepository
  let messageRepository: MessageRepository

  let roomsService: RoomsService

  let authTestData: AuthTestData

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    userRepository = app.get<UserRepository>(UserRepository)
    roomRepository = app.get<RoomRepository>(RoomRepository)
    messageRepository = app.get<MessageRepository>(MessageRepository)

    roomsService = app.get<RoomsService>(RoomsService)

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  describe('/rooms (POST)', () => {
    beforeEach(async () => {
      authTestData = await generateAuthTestData(app)
    })

    afterEach(async () => {
      await userRepository.delete({})
      await roomRepository.delete({})
      await messageRepository.delete({})
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

  describe('/rooms/:id/messages (POST)', () => {
    beforeEach(async () => {
      authTestData = await generateAuthTestData(app)
    })

    afterEach(async () => {
      await userRepository.delete({})
      await roomRepository.delete({})
      await messageRepository.delete({})
    })

    it('should throw 401 when user not authenticated', async () => {
      await request(app.getHttpServer()).post('/rooms/12/messages').expect(401)
    })

    it('should create message and return it', async () => {
      const room = await roomsService.create()

      const {body} = await request(app.getHttpServer())
        .post(`/rooms/${room.id}/messages`)
        .set('Authorization', `Bearer ${authTestData.token}`)
        .send({
          text: 'Hello',
        })
        .expect(201)

      deepEqual(
        body,
        instanceToPlain(
          plainToClass(
            MessageDto,
            {
              id: body.id,
              room,
              text: 'Hello',
              user: authTestData.user,
            },
            {excludeExtraneousValues: true}
          )
        )
      )
    })
  })
})
