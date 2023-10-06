/* eslint-disable max-len */
import {ok} from 'node:assert'
import {describe, it, mock} from 'node:test'

import {REQUEST_ACTIVE_USER_KEY} from '../../common/auth.constants'
import {FAKE_TOKEN, userMock} from '../../services/token/token.service.mock'

import {AccessTokenGuard} from './access-token.guard'

describe('AccessTokenGuard', () => {
  it('should return true when header and active user present', async () => {
    const guard = new AccessTokenGuard()
    const context = {
      switchToHttp: mock.fn(() => ({
        getRequest: mock.fn(() => ({
          raw: {
            [REQUEST_ACTIVE_USER_KEY]: {
              email: userMock.email,
              sub: userMock.id,
            },
            headers: {
              authorization: `Bearer ${FAKE_TOKEN}`,
            },
          },
        })),
      })),
    }

    const result = await guard.canActivate(context as any)

    ok(result)
  })

  it('should return false when header and active user not present', async () => {
    const guard = new AccessTokenGuard()
    const context = {
      switchToHttp: mock.fn(() => ({
        getRequest: mock.fn(() => ({
          raw: {
            headers: {},
          },
        })),
      })),
    }

    const result = await guard.canActivate(context as any)

    ok(!result)
  })
})
