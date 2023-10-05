import {deepEqual} from 'node:assert/strict'
import {describe, it} from 'node:test'

import {instanceToPlain, plainToInstance} from 'class-transformer'

import {UserDto} from '@/user/dto/user/user.dto'

describe('UserDto', () => {
  it('should remove unnecessary fields', () => {
    const user = plainToInstance(
      UserDto,
      {email: 'email@email.test', id: 1, password: 'password'},
      {excludeExtraneousValues: true}
    )

    deepEqual(instanceToPlain(user), {email: 'email@email.test', id: 1})
  })
})
