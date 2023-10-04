import {Module, Provider} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {APP_PIPE} from '@nestjs/core'
import {TypeOrmModule} from '@nestjs/typeorm'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {AuthorizationModule} from '@/authorization/authorization.module'
import {ValidationPipe} from '@/common/pipes/validation.pipe/validation.pipe'
import {UserModule} from '@/user/user.module'

import {AppController} from './app.controller'

const GLOBAL_PROVIDERS: Provider[] = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe(),
  },
]

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        database: configService.getOrThrow('DB_NAME'),
        host: configService.getOrThrow('DB_HOST'),
        password: configService.getOrThrow('DB_PASSWORD'),
        port: configService.getOrThrow('DB_PORT'),
        synchronize: true,
        type: 'postgres',
        username: configService.getOrThrow('DB_USER'),
      }),
    }),
    AuthenticationModule,
    AuthorizationModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
