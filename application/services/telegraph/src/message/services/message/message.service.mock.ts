import {mock} from 'node:test'

import {MessageService} from '@/message/services/message/message.service'
import {FAKE_MESSAGE_ID} from '@/storage/repositories/message/message.repository.mock'

type MessageServiceMock = {
  [method in keyof MessageService]: ReturnType<(typeof mock)['fn']>
}

export const createMessageServiceMock = (
  spies?: Partial<MessageServiceMock>
): Partial<MessageServiceMock> => {
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
