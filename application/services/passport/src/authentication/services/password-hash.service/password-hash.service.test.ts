import {notEqual, ok} from 'node:assert/strict'
import {beforeEach, describe, it} from 'node:test'

import {Test, TestingModule} from '@nestjs/testing'

import {PasswordHashService} from './password-hash.service'

import {validCredentials} from '@/authentication/test/authentication.mocks'

describe('PasswordHashService', () => {
  let service: PasswordHashService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordHashService],
    }).compile()

    service = module.get<PasswordHashService>(PasswordHashService)
  })

  it('returns hash', async () => {
    const {password} = validCredentials
    const hash = await service.createHash(password)

    ok(hash)
    notEqual(hash, password)
  })

  it('validates password', async () => {
    const {password} = validCredentials
    const hash = await service.createHash(password)

    const valid = await service.validatePassword(password, hash)
    const notValid = await service.validatePassword(`${password}_wrong`, hash)

    ok(valid)
    ok(!notValid)
  })
})
