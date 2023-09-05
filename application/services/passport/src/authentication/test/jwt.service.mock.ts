import {mock} from 'node:test'

import {JwtService} from '@nestjs/jwt'

export const FAKE_TOKEN = 'FAKE_TOKEN'

type JwtServiceMock = {
  [method in keyof JwtService]: ReturnType<(typeof mock)['fn']>
}

export const createJwtServiceMock = (
  spies?: Partial<JwtServiceMock>
): Partial<JwtServiceMock> => {
  const signAsyncSpy = mock.fn(() => Promise.resolve(FAKE_TOKEN))

  return {
    signAsync: signAsyncSpy,
    ...spies,
  }
}
