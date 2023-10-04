import {Inject, Injectable} from '@nestjs/common'
import {ClientProxy} from '@nestjs/microservices'

import {NATS_CLIENT_KEY} from '@/microservices/common/clients-module-options/constants'

@Injectable()
export class NatsService {
  constructor(
    @Inject(NATS_CLIENT_KEY) private readonly natsClient: ClientProxy
  ) {}

  emit: typeof this.natsClient.emit = this.natsClient.emit

  send: typeof this.natsClient.send = this.natsClient.send
}
