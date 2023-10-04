import {mock} from 'node:test'

import {TokenService} from '@/authentication/services/token/token.service'
import {
  FAKE_USER_ID,
  userMock,
} from '@/storage/repositories/user/user-mock.repository'

export const FAKE_TOKEN = 'FAKE_TOKEN'

export const authMock = {email: userMock.email, sub: FAKE_USER_ID}

type JwtServiceMock = {
  [method in keyof TokenService]: ReturnType<(typeof mock)['fn']>
}

export const createTokenMockService = (
  spies?: Partial<JwtServiceMock>
): Partial<JwtServiceMock> => {
  const wrapSpy = mock.fn(() => Promise.resolve(FAKE_TOKEN))
  const unwrapSpy = mock.fn(() =>
    Promise.resolve({
      email: userMock.email,
      sub: FAKE_USER_ID,
    })
  )

  return {
    wrap: wrapSpy,
    unwrap: unwrapSpy,
    ...spies,
  }
}
