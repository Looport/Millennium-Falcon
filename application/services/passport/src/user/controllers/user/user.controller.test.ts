import {deepEqual} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test} from '@nestjs/testing'

import {UserRepository} from '@/storage/repositories/user/user.repository'
import {
  createUserMockRepository,
  FAKE_USER_ID,
  userMock,
} from '@/storage/repositories/user/user.repository.mock'

import {UserController} from './user.controller'

describe('UserController', () => {
  let controller: UserController

  const userRepositoryMock = createUserMockRepository()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should return active user', async () => {
    const activeUser = {email: userMock.email, sub: FAKE_USER_ID}
    const result = await controller.iam(activeUser)

    deepEqual(userRepositoryMock.findOne.mock.calls[0].arguments, [
      {where: {id: activeUser.sub}},
    ])

    deepEqual(result, userMock)
  })
})
