import {afterEach, mock} from 'node:test'

import {RoomService} from '@/room/services/rooms/room.service'
import {
  FAKE_ROOM_ID,
  roomMock,
} from '@/storage/repositories/room/room.repository.mock'

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
  const findOneSpy = mock.fn(() => Promise.resolve(roomMock))
  const generateUrl = mock.fn(() => 'FAKE_URL')

  afterEach(() => {
    findOneSpy.mock.resetCalls()
  })

  return {
    create: createSpy,
    findOne: findOneSpy,
    generateUrl,
    ...spies,
  }
}
