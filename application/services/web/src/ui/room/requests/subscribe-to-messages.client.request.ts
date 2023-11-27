import {getTelegraphApiUrl} from '@/common/lib/request/utils/get-api-urls'
import {MessageResponse} from '@/room/interfaces/message-response.interface'
import {getClientToken} from '@/ui/auth/lib/token.client'

export const requestClientSubscribeToMessages = async ({
  roomId,
  signal,
  onMessage,
  onFinish,
}: {
  roomId: number
  signal: AbortSignal
  onMessage?: (message: MessageResponse) => void
  onFinish?: () => void
}) => {
  const accessToken = getClientToken()
  if (!accessToken) throw new Error('No access token')

  const response = await fetch(
    `${getTelegraphApiUrl()}/rooms/${roomId}/messages/subscribe`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

    const string = parseStreamChunk(value)
    if (!isInitMessage(string)) {
      onMessage?.(getMessage(string))
    }
  }
}

const getMessage = (dataString: string) => {
  console.log(dataString)
  const MESSAGE_REGEXP = /(?<trash>data): (?<message>.*)/u

  const message = dataString.match(MESSAGE_REGEXP)?.[2]

  if (!message) {
    throw new Error(
      `Data string "${dataString}" could not be parsed from stream`
    )
  }

  return JSON.parse(message)
}

const parseStreamChunk = (chunk: Uint8Array) =>
  new TextDecoder('utf-8').decode(chunk)

const isInitMessage = (dataString: string) => dataString.length <= 1
