import {Module, Provider} from '@nestjs/common'
import {APP_PIPE} from '@nestjs/core'
import {TypeOrmModule} from '@nestjs/typeorm'

import {AppController} from './app.controller'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {ValidationPipe} from '@/common/pipes/validation.pipe/validation.pipe'
import {UserModule} from '@/user/user.module'

const GLOBAL_PROVIDERS: Provider[] = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe(),
  },
]

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'hxljydzm',
      host: 'trumpet.db.elephantsql.com',
      password: 'Glq24OmOBfDtsYovbDl5Ufkrky21SjJ5',
      synchronize: true,
      type: 'postgres',
      username: 'hxljydzm',
    }),
    AuthenticationModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
