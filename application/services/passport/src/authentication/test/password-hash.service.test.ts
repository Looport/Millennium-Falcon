import {ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {PasswordHashService} from '../services/password-hash.service'

describe('PasswordHashService', () => {
  let service: PasswordHashService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordHashService],
    }).compile()

    service = module.get<PasswordHashService>(PasswordHashService)
  })

  it('returns hash', async () => {
    const password = 'jJ(3400J*#'

    const hash = await service.createHash(password)

    ok(hash)
  })

  it('validates password', async () => {
    const password = 'jJ(3400J*#'

    const hash = await service.createHash(password)

    const valid = await service.validatePassword(password, hash)
    const notValid = await service.validatePassword(`${password}_wrong`, hash)

    ok(valid)
    ok(!notValid)
  })
})
