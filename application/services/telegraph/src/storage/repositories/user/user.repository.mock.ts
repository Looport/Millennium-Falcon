import {afterEach, mock} from 'node:test'

import {UserRepository} from '@/storage/repositories/user/user.repository'

export const FAKE_USER_ID = 1

export const userMock = {
  email: 'eliot@e-corp.com',
  id: FAKE_USER_ID,
}

type UserRepositoryMock = {
  [method in keyof UserRepository]: ReturnType<(typeof mock)['fn']>
}

export const createUserRepositoryMock = (
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
