import {Injectable} from '@nestjs/common'

import {NATSProxyClient} from '../../common/nats-proxy'
import {InjectNATS} from '../../decorators/inject-nats.decorator'

@Injectable()
export class NATSService {
  constructor(@InjectNATS() private readonly client: NATSProxyClient) {}

  emit = this.client.emit.bind(this.client)

  send = this.client.send.bind(this.client)
}
