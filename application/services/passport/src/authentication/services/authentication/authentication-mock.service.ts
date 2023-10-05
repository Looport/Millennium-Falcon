import {mock} from 'node:test'

import {FAKE_TOKEN} from '@looport/nest-auth'

import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {userMock} from '@/storage/repositories/user/user-mock.repository'

type AuthenticationMockService = {
  [method in keyof AuthenticationService]: ReturnType<(typeof mock)['fn']>
}

export const createAuthenticationMockService = (
  spies?: Partial<AuthenticationMockService>
): Partial<AuthenticationMockService> => {
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

  return {
    login: loginSpy,
    register: registerSpy,
    ...spies,
  }
}
