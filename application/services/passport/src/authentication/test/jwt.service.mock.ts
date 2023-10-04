import {mock} from 'node:test'

import {JwtService} from '@nestjs/jwt'

import {
  FAKE_USER_ID,
  userMock,
} from '@/storage/repositories/user/user-mock.repository'

export const FAKE_TOKEN = 'FAKE_TOKEN'

type JwtServiceMock = {
  [method in keyof JwtService]: ReturnType<(typeof mock)['fn']>
}

export const authMock = {email: userMock.email, sub: FAKE_USER_ID}

export const createJwtServiceMock = (
  spies?: Partial<JwtServiceMock>
): Partial<JwtServiceMock> => {
  const signAsyncSpy = mock.fn(() => Promise.resolve(FAKE_TOKEN))
  const verifyAsyncSpy = mock.fn(() =>
    Promise.resolve({
      email: userMock.email,
      sub: FAKE_USER_ID,
    })
  )

  return {
    signAsync: signAsyncSpy,
    verifyAsync: verifyAsyncSpy,
    ...spies,
  }
}
