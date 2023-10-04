import {ok} from 'node:assert'
import {equal} from 'node:assert/strict'
import {describe, it, mock} from 'node:test'

import {AuthType} from '../../decorators/auth/auth-types.enum'

import {AuthenticationGuard} from './auth.guard'

describe('AuthGuard', () => {
  it('should call default guard when auth type not provided', async () => {
    const reflectorMock = {
      getAllAndOverride: mock.fn(() => null),
    }

    const guardResultMock = true
    const defaultGuard = {canActivate: mock.fn(() => guardResultMock)}

    const guard = new AuthenticationGuard(
      reflectorMock as any,
      defaultGuard as any
    )

    const result = await guard.canActivate({
      getClass: mock.fn(() => null),
      getHandler: mock.fn(() => null),
    } as any)

    equal(defaultGuard.canActivate.mock.calls.length, 1)

    equal(result, guardResultMock)
  })

  it('should call none guard when auth none type provided', async () => {
    const reflectorMock = {
      getAllAndOverride: mock.fn(() => [AuthType.None]),
    }

    const defaultGuard = {canActivate: mock.fn(() => true)}

    const guard = new AuthenticationGuard(
      reflectorMock as any,
      defaultGuard as any
    )

    const result = await guard.canActivate({
      getClass: mock.fn(() => null),
      getHandler: mock.fn(() => null),
    } as any)

    equal(defaultGuard.canActivate.mock.calls.length, 0)

    ok(result)
  })
})
