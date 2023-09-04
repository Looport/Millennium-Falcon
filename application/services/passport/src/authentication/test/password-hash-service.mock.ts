import {mock} from 'node:test'

import {PasswordHashService} from '@/authentication/services/password-hash.service/password-hash.service'

export const FAKE_PASSWORD_HASH = 'jCf9$32*#Ejf9'

type PasswordHashServiceMock = {
  [method in keyof PasswordHashService]: ReturnType<(typeof mock)['fn']>
}

export const createPasswordServiceMock = (
  spies?: Partial<PasswordHashServiceMock>
): Partial<PasswordHashServiceMock> => {
  const createHashSpy = mock.fn()
  const validatePasswordSpy = mock.fn()

  return {
    createHash: createHashSpy,
    validatePassword: validatePasswordSpy,
    ...spies,
  }
}
