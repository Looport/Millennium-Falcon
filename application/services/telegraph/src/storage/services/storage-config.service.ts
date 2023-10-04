import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {TypeOrmModuleOptions} from '@nestjs/typeorm'

@Injectable()
export class StorageConfigService {
  constructor(private readonly configService: ConfigService) {}

  getTypeormConfig(): TypeOrmModuleOptions {
    return {
      autoLoadEntities: true,
      database: this.configService.getOrThrow('DB_NAME'),
      host: this.configService.getOrThrow('DB_HOST'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      port: this.configService.getOrThrow('DB_PORT'),
      synchronize: true,
      type: 'postgres',
      username: this.configService.getOrThrow('DB_USER'),
    }
  }
}
