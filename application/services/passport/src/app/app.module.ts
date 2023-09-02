import {Module, Provider} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {AppController} from './app.controller'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {UserModule} from '@/user/user.module'
import {APP_PIPE} from "@nestjs/core";
import {ValidationPipe} from "@/app/pipes/validation.pipe";

const GLOBAL_PROVIDERS: Provider[] = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe()
  }
]

@Module({
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
  controllers: [AppController],
  providers: [
    ...GLOBAL_PROVIDERS
  ]
})
export class AppModule {
}
