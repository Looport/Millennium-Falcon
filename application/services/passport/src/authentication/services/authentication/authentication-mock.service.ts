import {mock} from 'node:test'

import {AuthenticationService} from '@/authentication/services/authentication.service/authentication.service'
import {FAKE_TOKEN} from '@/authentication/test/jwt.service.mock'

type AuthenticationMockService = {
  [method in keyof AuthenticationService]: ReturnType<(typeof mock)['fn']>
}

export const createAuthenticationServiceMock = (
  spies?: Partial<AuthenticationMockService>
): Partial<AuthenticationMockService> => {
  const registerSpy = mock.fn(() => Promise.resolve({
    accessToken: FAKE_TOKEN
  }))
  const loginSpy = mock.fn(() => Promise.resolve({
    accessToken: FAKE_TOKEN
  }))

  return {
    register: registerSpy,
    login: loginSpy,
    ...spies,
  }
}
