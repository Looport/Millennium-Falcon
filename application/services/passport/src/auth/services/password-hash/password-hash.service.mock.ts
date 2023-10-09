import {mock} from 'node:test'

import {PasswordHashService} from '@/auth/services/password-hash/password-hash.service'

export const FAKE_PASSWORD_HASH = 'jCf9$32*#Ejf9'

type PasswordHashServiceMock = {
  [method in keyof PasswordHashService]: ReturnType<(typeof mock)['fn']>
}

export const createPasswordMockService = (
  spies?: Partial<PasswordHashServiceMock>
): Partial<PasswordHashServiceMock> => {
  const createHashSpy = mock.fn(() => Promise.resolve(FAKE_PASSWORD_HASH))
  const validatePasswordSpy = mock.fn(() => Promise.resolve(true))

  return {
    createHash: createHashSpy,
    validatePassword: validatePasswordSpy,
    ...spies,
  }
}
