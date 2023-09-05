import {mock} from 'node:test'

import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'

export const FAKE_PASSWORD_HASH = 'jCf9$32*#Ejf9'

type PasswordHashMockService = {
  [method in keyof PasswordHashService]: ReturnType<(typeof mock)['fn']>
}

export const createPasswordServiceMock = (
  spies?: Partial<PasswordHashMockService>
): Partial<PasswordHashMockService> => {
  const createHashSpy = mock.fn(() => Promise.resolve(FAKE_PASSWORD_HASH))
  const validatePasswordSpy = mock.fn(() => Promise.resolve(true))

  return {
    createHash: createHashSpy,
    validatePassword: validatePasswordSpy,
    ...spies,
  }
}
