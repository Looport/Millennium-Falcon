import {Module, Provider} from '@nestjs/common'
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
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: process.env.DB_NAME ?? 'db',
      host: process.env.DB_HOST ?? 'localhost',
      password: process.env.DB_PASSWORD ?? 'root',
      synchronize: true,
      type: 'postgres',
      username: process.env.DB_USER ?? 'root',
    }),
    AuthenticationModule,
    AuthorizationModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
