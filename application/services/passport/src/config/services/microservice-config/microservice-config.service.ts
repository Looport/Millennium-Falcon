import {Transport, MicroserviceModuleOptions} from '@looport/nest-microservice'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class MicroserviceConfigService {
  constructor(private readonly configService: ConfigService) {}

  getNATSConfig(): MicroserviceModuleOptions {
    return {
      options: {
        name: 'passport',
        servers: [this.configService.getOrThrow('NATS_URL')],
      },
      transport: Transport.NATS,
    }
  }
}
