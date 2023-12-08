import {deepEqual} from 'node:assert/strict'
import {describe, it} from 'node:test'

import {instanceToPlain, plainToInstance} from 'class-transformer'

import {RoomDto} from '@/room/dto/room/room.dto'

describe('RoomDto', () => {
  it('should remove unnecessary fields', () => {
    const user = plainToInstance(
      RoomDto,
      {id: 1, messages: undefined, url: 'fieojfw'},
      {excludeExtraneousValues: true}
    )

    deepEqual(instanceToPlain(user), {id: 1, url: 'fieojfw'})
  })
})
