import {mock} from 'node:test'

import {UserRepository} from '@/storage/repositories/user/user.repository'

export const FAKE_USER_ID = 1

export const userMock = {
  email: 'eliot@e-corp.com',
  id: FAKE_USER_ID,
  passwordHash: 'FAKE_PASSWORD_HASH',
}

type UserMockRepository = {
  [method in keyof UserRepository]: ReturnType<(typeof mock)['fn']>
}

export const createUserMockRepository = (
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
