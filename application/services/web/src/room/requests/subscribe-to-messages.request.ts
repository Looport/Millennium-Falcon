import {getToken} from '@/auth/lib/token.client'
import {TELEGRAPH_API_URL} from '@/common/lib/request/constants'

export const requestSubscribeToMessages = async ({
  roomId,
  signal,
  onMessage,
  onFinish,
}: {
  roomId: number
  signal: AbortSignal
  onMessage?: (message: any) => void
  onFinish?: () => void
}) => {
  const response = await fetch(
    `${TELEGRAPH_API_URL}/rooms/${roomId}/messages/subscribe`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      signal,
    }
  )

  if (!response.ok || !response.body) {
    throw new Error('Could not subscribe to messages')
  }

  const reader = response.body.getReader()

  const LISTEN_CONDITION = 'forever'
  // eslint-disable-next-line no-unmodified-loop-condition
  while (LISTEN_CONDITION) {
    // eslint-disable-next-line no-await-in-loop
    const {done, value} = await reader.read()
    if (done) {
      onFinish?.()
      return
    }

    const chunk = parseStreamChunk(value)
    if (!isInitMessage(chunk)) {
      onMessage?.(getMessage(chunk))
    }
  }
}

const getMessage = (dataString: string) => {
  const MESSAGE_REGEXP = /(?<trash>data): (?<message>.*)/u

  const message = dataString.match(MESSAGE_REGEXP)?.[2]

  if (!message) {
    throw new Error('Message could be parsed from stream')
  }

  return JSON.parse(message)
}

const parseStreamChunk = (chunk: Uint8Array) =>
  new TextDecoder('utf-8').decode(chunk)

const isInitMessage = (dataString: string) => dataString.length < 1
