import {afterEach, mock} from 'node:test'

import {FAKE_PASSWORD_HASH} from '@/authentication/services/password-hash/password-hash.service.mock'
import {UserRepository} from '@/storage/repositories/user/user.repository'

export const FAKE_USER_ID = 1

export const userMock = {
  email: 'elliot@e-corp.com',
  id: FAKE_USER_ID,
  passwordHash: FAKE_PASSWORD_HASH,
}

type UserRepositoryMock = {
  [method in keyof UserRepository]: ReturnType<(typeof mock)['fn']>
}

export const createUserMockRepository = (
  spies?: Partial<UserRepositoryMock>
): Partial<UserRepositoryMock> => {
  const createSpy = mock.fn((data) => data)
  const saveSpy = mock.fn((data) =>
    Promise.resolve({id: FAKE_USER_ID, ...data})
  )
  const findOneSpy = mock.fn(() => Promise.resolve(userMock))

  afterEach(() => {
    createSpy.mock.resetCalls()
    saveSpy.mock.resetCalls()
    findOneSpy.mock.resetCalls()
  })

  return {
    create: createSpy,
    findOne: findOneSpy,
    save: saveSpy,
    ...spies,
  }
}
