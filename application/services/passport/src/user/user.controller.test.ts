import {deepEqual} from 'node:assert/strict'
import {beforeEach, describe, it, mock} from 'node:test'

import {Test} from '@nestjs/testing'
import {getRepositoryToken} from '@nestjs/typeorm'

import {UserController} from './user.controller'

import {
  createUserRepositoryMock,
  FAKE_USER_ID,
  userMock,
} from '@/user/entities/user/user-mock.repository'
import {UserEntity} from '@/user/entities/user/user.entity'

describe('UserController', () => {
  let controller: UserController

  const userRepositoryMock = createUserRepositoryMock()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should return active user', async () => {
    const {findOne} = createUserRepositoryMock({
      findOne: mock.fn(() => Promise.resolve(userMock)),
    })
    userRepositoryMock.findOne = findOne

    const activeUser = {email: userMock.email, sub: FAKE_USER_ID}
    const result = await controller.iam(activeUser)

    deepEqual(userRepositoryMock.findOne.mock.calls[0].arguments, [
      {where: {id: activeUser.sub}},
    ])

    deepEqual(result, userMock)
  })
})
