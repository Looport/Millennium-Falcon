import {mock} from 'node:test'

import {RoomService} from '@/room/services/rooms/room.service'
import {FAKE_ROOM_ID} from '@/storage/repositories/room/room.repository.mock'

type RoomServiceMock = {
  [method in keyof RoomService]: ReturnType<(typeof mock)['fn']>
}

export const createRoomMockService = (
  spies?: Partial<RoomServiceMock>
): Partial<RoomServiceMock> => {
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
