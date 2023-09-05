import {mock} from 'node:test'

import {Repository} from 'typeorm'

import {FAKE_PASSWORD_HASH} from '@/authentication/services/password-hash/password-hash-mock.service'
import {validCredentials} from '@/authentication/test/authentication.mock'
import {UserEntity} from '@/user/entities/user/user.entity'

export const FAKE_USER_ID = 1

export const userMock = {
  email: validCredentials.email,
  id: FAKE_USER_ID,
  passwordHash: FAKE_PASSWORD_HASH,
}

type UserMockRepository = {
  [method in keyof Repository<UserEntity>]: ReturnType<(typeof mock)['fn']>
}

export const createUserRepositoryMock = (
  spies?: Partial<UserMockRepository>
): Partial<UserMockRepository> => {
  const createSpy = mock.fn((data) => data)
  const saveSpy = mock.fn((data) =>
    Promise.resolve({id: FAKE_USER_ID, ...data})
  )
  const findOneSpy = mock.fn(() => Promise.resolve(userMock))

  return {
    create: createSpy,
    findOne: findOneSpy,
    save: saveSpy,
    ...spies,
  }
}
