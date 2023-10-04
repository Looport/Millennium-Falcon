import {deepEqual, equal} from 'node:assert/strict'
import {describe, it, mock} from 'node:test'

import {
  authMock,
  createTokenMockService,
  FAKE_TOKEN,
} from '@/authentication/services/token/token-mock.service'
import {REQUEST_ACTIVE_USER_KEY} from '@/authorization/common/constants'

import {TokenMiddleware} from './token.middleware'

describe('TokenMiddleware', () => {
  it('should inject token payload when header present', async () => {
    const request = {headers: {authorization: `Bearer ${FAKE_TOKEN}`}}
    const tokenService = createTokenMockService()

    const nextSpy = mock.fn(() => {})
    const middleware = new TokenMiddleware(tokenService as any)
    await middleware.use(request, {}, nextSpy)

    deepEqual(tokenService.unwrap.mock.calls[0].arguments, [FAKE_TOKEN])
    deepEqual(request[REQUEST_ACTIVE_USER_KEY], authMock)

    deepEqual(nextSpy.mock.calls.length, 1)
  })

  it('should skip token injection when header not present', async () => {
    const request = {headers: {}}
    const tokenService = createTokenMockService()

    const nextSpy = mock.fn(() => {})
    const middleware = new TokenMiddleware(tokenService as any)
    await middleware.use(request, {}, nextSpy)

    equal(tokenService.unwrap.mock.calls.length, 0)
    deepEqual(request[REQUEST_ACTIVE_USER_KEY], undefined)

    deepEqual(nextSpy.mock.calls.length, 1)
  })
})
