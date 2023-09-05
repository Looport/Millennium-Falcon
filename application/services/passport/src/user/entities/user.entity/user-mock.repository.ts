import {mock} from 'node:test'

import {Repository} from 'typeorm'

import {UserEntity} from '@/user/entities/user.entity/user.entity'
import {validCredentials} from "@/authentication/test/authentication.mock";
import {FAKE_PASSWORD_HASH} from "@/authentication/services/password-hash.service/password-hash-mock.service";

export const FAKE_USER_ID = 1

export const userMock = {
  id: FAKE_USER_ID,
  email: validCredentials.email,
  passwordHash: FAKE_PASSWORD_HASH
}

type UserMockRepository = {
  [method in keyof Repository<UserEntity>]: ReturnType<(typeof mock)['fn']>
}

export const createUserRepositoryMock = (
  spies?: Partial<UserMockRepository>
): Partial<UserMockRepository> => {
  const createSpy = mock.fn((data) => data)
  const saveSpy = mock.fn((data) => Promise.resolve({id: FAKE_USER_ID, ...data}))
  const findOneSpy = mock.fn(() => Promise.resolve(userMock))

  return {
    create: createSpy,
    findOne: findOneSpy,
    save: saveSpy,
    ...spies,
  }
}