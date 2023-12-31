import {afterEach, mock} from 'node:test'

import {RoomRepository} from '@/storage/repositories/room/room.repository'

export const FAKE_ROOM_ID = 1

export const roomMock = {
  id: FAKE_ROOM_ID,
  url: 'foweijfoisjdcj',
}

type RoomRepositoryMock = {
  [method in keyof RoomRepository]: ReturnType<(typeof mock)['fn']>
}

export const createRoomRepositoryMock = (
  spies?: Partial<RoomRepositoryMock>
): Partial<RoomRepositoryMock> => {
  const createSpy = mock.fn((data) => data)
  const saveSpy = mock.fn((data) =>
    Promise.resolve({id: FAKE_ROOM_ID, ...data})
  )
  const findOneSpy = mock.fn(() => Promise.resolve(roomMock))

  afterEach(() => {
    createSpy.mock.resetCalls()
    findOneSpy.mock.resetCalls()
    saveSpy.mock.resetCalls()
  })

  return {
    create: createSpy,
    findOne: findOneSpy,
    save: saveSpy,
    ...spies,
  }
}
