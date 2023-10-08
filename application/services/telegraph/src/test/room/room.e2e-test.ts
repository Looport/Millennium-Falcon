import {deepEqual, ok} from 'node:assert/strict'
import {afterEach, beforeEach, describe, it} from 'node:test'

import {EventEmitter2} from '@nestjs/event-emitter'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
import {Test} from '@nestjs/testing'
import request from 'supertest'

import {AppModule} from '@/app/app.module'
import {createMessageCreatedSubject} from '@/event/services/message-event.service.lib'
import {serializeMessage} from '@/message/dto/message/message-serializer'
import {RoomService} from '@/room/services/rooms/room.service'
import {MessageRepository} from '@/storage/repositories/message/message.repository'
import {messageMock} from '@/storage/repositories/message/message.repository.mock'
import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {
  AuthTestData,
  generateAuthTestData,
} from '@/test/auth/lib/generate-auth-test-data'

describe('RoomController (e2e)', () => {
  let app: NestFastifyApplication

  let userRepository: UserRepository
  let roomRepository: RoomRepository
  let messageRepository: MessageRepository

  let eventEmitter: EventEmitter2

  let roomService: RoomService

  let authTestData: AuthTestData

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter())

    userRepository = app.get<UserRepository>(UserRepository)
    roomRepository = app.get<RoomRepository>(RoomRepository)
    messageRepository = app.get<MessageRepository>(MessageRepository)

    eventEmitter = app.get<EventEmitter2>(EventEmitter2)

    roomService = app.get<RoomService>(RoomService)

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
      const room = await roomService.create()

      const {body} = await request(app.getHttpServer())
        .post(`/rooms/${room.id}/messages`)
        .set('Authorization', `Bearer ${authTestData.token}`)
        .send({
          text: messageMock.text,
        })
        .expect(201)

      deepEqual(
        body,
        serializeMessage({
          id: body.id,
          room,
          text: messageMock.text,
          user: authTestData.user,
        })
      )
    })

    it('should emit message', async () => {
      const room = await roomService.create()

      const waitForMessagePromise = new Promise((resolve) => {
        eventEmitter.once(createMessageCreatedSubject(room.id), resolve)
      })

      const {body} = await request(app.getHttpServer())
        .post(`/rooms/${room.id}/messages`)
        .set('Authorization', `Bearer ${authTestData.token}`)
        .send({
          text: messageMock.text,
        })
        .expect(201)

      const message = await waitForMessagePromise

      deepEqual(
        message,
        serializeMessage({
          id: body.id,
          room,
          text: body.text,
          user: authTestData.user,
        })
      )
    })
  })

  describe.skip('/rooms/:id/messages/subscribe (SSE)', {skip: true}, () => {
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

    it('should emit message', async () => {
      const room = await roomService.create()

      const {on} = await request(app.getHttpServer())
        .connect(`/rooms/${room.id}/messages/subscribe`)
        .set('Authorization', `Bearer ${authTestData.token}`)
        .expect('Content-Type', 'text/event-stream')
        .expect('Cache-Control', 'no-cache')
        .expect('Connection', 'keep-alive')

      on('data', (chunk) => {
        const data = JSON.parse(chunk.toString().split('\n')[1])
        /*
         * deepEqual(
         *   data,
         *   instanceToPlain(
         *     plainToClass(MessageDto, {
         *       id: body.id,
         *       room,
         *       text: body.text,
         *       user: authTestData.user,
         *     })
         *   )
         * )
         */
      })

      const {body} = await request(app.getHttpServer())
        .post(`/rooms/${room.id}/messages`)
        .set('Authorization', `Bearer ${authTestData.token}`)
        .send({
          text: messageMock.text,
        })
        .expect(201)
    })

    it.todo('should not emit message when sender same as receiver')
  })
})
