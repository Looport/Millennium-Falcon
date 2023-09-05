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
      database: 'db',
      host: 'localhost',
      password: 'root',
      username: 'root',
      synchronize: true,
      type: 'postgres',
    }),
    AuthenticationModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
