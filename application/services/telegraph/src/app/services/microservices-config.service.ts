import {MicroservicesOptions, Transport} from '@looport/nest-microservices'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class MicroservicesConfigService {
  constructor(private readonly configService: ConfigService) {}

  getNATSConfig(): MicroservicesOptions {
    return {
      options: {
        name: 'telegraph',
        servers: [this.configService.getOrThrow('NATS_URL')],
      },
      transport: Transport.NATS,
    }
  }
}
