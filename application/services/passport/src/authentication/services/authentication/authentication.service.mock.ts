import {afterEach, mock} from 'node:test'

import {FAKE_TOKEN} from '@looport/nest-auth'

import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {userMock} from '@/storage/repositories/user/user.repository.mock'

export const validCredentials = {
  email: 'elliot@ecorp.com',
  password: 'oj(32$#j',
}
export const invalidCredentials = {email: 'elliot', password: 'oj(3'}

type AuthenticationServiceMock = {
  [method in keyof AuthenticationService]: ReturnType<(typeof mock)['fn']>
}

export const createAuthenticationMockService = (
  spies?: Partial<AuthenticationServiceMock>
): Partial<AuthenticationServiceMock> => {
  const registerSpy = mock.fn(() =>
    Promise.resolve({
      accessToken: FAKE_TOKEN,
      user: userMock,
    })
  )
  const loginSpy = mock.fn(() =>
    Promise.resolve({
      accessToken: FAKE_TOKEN,
      userMock,
    })
  )

  afterEach(() => {
    registerSpy.mock.resetCalls()
    loginSpy.mock.resetCalls()
  })

  return {
    login: loginSpy,
    register: registerSpy,
    ...spies,
  }
}
