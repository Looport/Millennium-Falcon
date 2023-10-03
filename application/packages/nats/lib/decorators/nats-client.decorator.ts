import {applyDecorators, Inject} from '@nestjs/common'

import {NATS_CLIENT_PROVIDER_KEY} from './constants'

export const NATSClient = applyDecorators(Inject(NATS_CLIENT_PROVIDER_KEY))
