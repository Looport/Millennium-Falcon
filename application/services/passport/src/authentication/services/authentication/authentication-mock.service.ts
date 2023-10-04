import {mock} from 'node:test'

import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {userMock} from '@/storage/repositories/user/user-mock.repository'
import {FAKE_TOKEN} from "@/authentication/services/token/token-mock.service";

type AuthenticationMockService = {
  [method in keyof AuthenticationService]: ReturnType<(typeof mock)['fn']>
}

export const createAuthenticationServiceMock = (
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
