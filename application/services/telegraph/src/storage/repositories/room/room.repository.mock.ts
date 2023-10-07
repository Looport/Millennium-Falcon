import {mock} from 'node:test'

import {RoomRepository} from '@/storage/repositories/room/room.repository'

export const FAKE_USER_ID = 1

export const roomMock = {
  id: FAKE_USER_ID,
  url: 'foweijfoisjdcj',
}

type RoomRepositoryMock = {
  [method in keyof RoomRepository]: ReturnType<(typeof mock)['fn']>
}

export const createUserMockRepository = (
  spies?: Partial<RoomRepositoryMock>
): Partial<RoomRepositoryMock> => {
  const createSpy = mock.fn((data) => data)
  const saveSpy = mock.fn((data) =>
    Promise.resolve({id: FAKE_USER_ID, ...data})
  )
  const findOneSpy = mock.fn(() => Promise.resolve(roomMock))

  return {
    create: createSpy,
    findOne: findOneSpy,
    save: saveSpy,
    ...spies,
  }
}
