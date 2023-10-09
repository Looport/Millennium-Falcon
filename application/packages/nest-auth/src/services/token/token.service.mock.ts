import {mock} from 'node:test'

import {TokenService} from './token.service'

export const FAKE_USER_ID = 1

export const userMock = {
  email: 'elliot@e-corp.com',
  id: FAKE_USER_ID,
  passwordHash: 'FAKE_PASSWORD_HASH',
}

export const FAKE_TOKEN = 'FAKE_TOKEN'

export const authMock = {email: userMock.email, sub: FAKE_USER_ID}

type JwtServiceMock = {
  [method in keyof TokenService]: ReturnType<(typeof mock)['fn']>
}

export const createTokenServiceMock = (
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
    unwrap: unwrapSpy,
    wrap: wrapSpy,
    ...spies,
  }
}
