import {mock} from 'node:test'

import {Repository} from 'typeorm'

import {UserEntity} from '@/user/entities/user.entity'

export const FAKE_USER_ID = 1

type UserRepositoryMock = {
  [method in keyof Repository<UserEntity>]: ReturnType<(typeof mock)['fn']>
}

export const createUserRepositoryMock = (
  spies?: Partial<UserRepositoryMock>
): Partial<UserRepositoryMock> => {
  const createSpy = mock.fn((data) => Promise.resolve(data))
  const saveSpy = mock.fn((data) => Promise.resolve(data))
  const findOneSpy = mock.fn()

  return {
    create: createSpy,
    findOne: findOneSpy,
    save: saveSpy,
    ...spies,
  }
}
