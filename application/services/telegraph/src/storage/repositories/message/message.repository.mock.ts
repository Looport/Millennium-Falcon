import {mock} from 'node:test'

import {MessageRepository} from '@/storage/repositories/message/message.repository'
import {roomMock} from '@/storage/repositories/room/room.repository.mock'
import {userMock} from '@/storage/repositories/user/user.repository.mock'

export const FAKE_MESSAGE_ID = 1

export const messageMock = {
  id: FAKE_MESSAGE_ID,
  room: roomMock,
  text: 'Hello',
  user: userMock,
}

type MessageRepositoryMock = {
  [method in keyof MessageRepository]: ReturnType<(typeof mock)['fn']>
}

export const createMessageMockRepository = (
  spies?: Partial<MessageRepositoryMock>
): Partial<MessageRepositoryMock> => {
  const createSpy = mock.fn((data) => data)
  const saveSpy = mock.fn((data) =>
    Promise.resolve({id: FAKE_MESSAGE_ID, ...data})
  )
  const findOneSpy = mock.fn(() => Promise.resolve(messageMock))

  return {
    create: createSpy,
    findOne: findOneSpy,
    save: saveSpy,
    ...spies,
  }
}
