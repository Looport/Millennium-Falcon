import {deepEqual, equal} from 'node:assert/strict'
import {describe, it, mock} from 'node:test'

import {
  authMock,
  createJwtServiceMock,
  FAKE_TOKEN,
} from '@/authentication/test/jwt.service.mock'
import {REQUEST_ACTIVE_USER_KEY} from '@/authorization/constants'

import {TokenMiddleware} from './token.middleware'

describe('TokenMiddleware', () => {
  it('should inject token payload when header present', async () => {
    const request = {headers: {authorization: `Bearer ${FAKE_TOKEN}`}}
    const jwtServiceMock = createJwtServiceMock()

    const nextSpy = mock.fn(() => {})
    const middleware = new TokenMiddleware(jwtServiceMock as any)
    await middleware.use(request, {}, nextSpy)

    deepEqual(jwtServiceMock.verifyAsync.mock.calls[0].arguments, [FAKE_TOKEN])
    deepEqual(request[REQUEST_ACTIVE_USER_KEY], authMock)

    deepEqual(nextSpy.mock.calls.length, 1)
  })

  it('should skip token injection when header not present', async () => {
    const request = {headers: {}}
    const jwtServiceMock = createJwtServiceMock()

    const nextSpy = mock.fn(() => {})
    const middleware = new TokenMiddleware(jwtServiceMock as any)
    await middleware.use(request, {}, nextSpy)

    equal(jwtServiceMock.verifyAsync.mock.calls.length, 0)
    deepEqual(request[REQUEST_ACTIVE_USER_KEY], undefined)

    deepEqual(nextSpy.mock.calls.length, 1)
  })
})
