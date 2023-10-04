import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {Transport} from '@nestjs/microservices'
import {NatsOptions} from '@nestjs/microservices/interfaces/microservice-configuration.interface'

@Injectable()
export class MicroservicesConfigService {
  constructor(private readonly configService: ConfigService) {}

  getNATSConfig(): NatsOptions {
    return {
      options: {
        name: 'passport',
        servers: [this.configService.getOrThrow('NATS_URL')],
      },
      transport: Transport.NATS,
    }
  }
}
