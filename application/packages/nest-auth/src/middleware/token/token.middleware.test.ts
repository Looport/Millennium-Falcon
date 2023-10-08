import {deepEqual, equal} from 'node:assert/strict'
import {describe, it, mock} from 'node:test'

import {
  authMock,
  createTokenServiceMock,
  FAKE_TOKEN,
} from '../../services/token/token.service.mock'

import {TokenMiddleware} from './token.middleware'
import {REQUEST_ACTIVE_USER_KEY} from './token.middleware.constants'

describe('TokenMiddleware', () => {
  it('should inject token payload when header present', async () => {
    const request = {headers: {authorization: `Bearer ${FAKE_TOKEN}`}}
    const tokenService = createTokenServiceMock()

    const nextSpy = mock.fn(() => {})
    const middleware = new TokenMiddleware(tokenService as any)
    await middleware.use(request, {}, nextSpy)

    deepEqual(tokenService.unwrap.mock.calls[0].arguments, [FAKE_TOKEN])
    deepEqual(request[REQUEST_ACTIVE_USER_KEY], authMock)

    deepEqual(nextSpy.mock.calls.length, 1)
  })

  it('should skip token injection when header not present', async () => {
    const request = {headers: {}}
    const tokenService = createTokenServiceMock()

    const nextSpy = mock.fn(() => {})
    const middleware = new TokenMiddleware(tokenService as any)
    await middleware.use(request, {}, nextSpy)

    equal(tokenService.unwrap.mock.calls.length, 0)
    deepEqual(request[REQUEST_ACTIVE_USER_KEY], undefined)

    deepEqual(nextSpy.mock.calls.length, 1)
  })
})
