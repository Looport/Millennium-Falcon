import {deepEqual} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test} from '@nestjs/testing'

import {UserRepository} from '@/storage/repositories/user/user.repository'
import {
  createUserMockRepository,
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

  it('should save user on passport registration event', async () => {
    await controller.handleUserRegistered(userMock)

    deepEqual(userRepositoryMock.save.mock.calls[0].arguments, [userMock])
  })
})
