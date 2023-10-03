import {Inject} from '@nestjs/common'

import {NATS_CLIENT_PROVIDER_KEY} from './constants'

export const InjectNATS = () => Inject(NATS_CLIENT_PROVIDER_KEY)
