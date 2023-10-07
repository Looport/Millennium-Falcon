import {mock} from 'node:test'

import {RoomsService} from '@/rooms/services/rooms/rooms.service'
import {FAKE_ROOM_ID} from '@/storage/repositories/room/room.repository.mock'

type RoomsServiceMock = {
  [method in keyof RoomsService]: ReturnType<(typeof mock)['fn']>
}

export const createRoomsMockService = (
  spies?: Partial<RoomsServiceMock>
): Partial<RoomsServiceMock> => {
  const createSpy = mock.fn((data) =>
    Promise.resolve({
      id: FAKE_ROOM_ID,
      ...data,
    })
  )
  const generateUrl = mock.fn(() => 'FAKE_URL')

  return {
    create: createSpy,
    generateUrl,
    ...spies,
  }
}
