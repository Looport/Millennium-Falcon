import {mock} from 'node:test'

import {MessagesService} from '@/messages/services/messages/messages.service'
import {FAKE_MESSAGE_ID} from '@/storage/repositories/message/message.repository.mock'

type MessagesServiceMock = {
  [method in keyof MessagesService]: ReturnType<(typeof mock)['fn']>
}

export const createMessagesMockService = (
  spies?: Partial<MessagesServiceMock>
): Partial<MessagesServiceMock> => {
  const createSpy = mock.fn((data) =>
    Promise.resolve({
      id: FAKE_MESSAGE_ID,
      ...data,
    })
  )
  return {
    create: createSpy,
    ...spies,
  }
}
