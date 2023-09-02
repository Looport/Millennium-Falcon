import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {AppController} from './app.controller/app.controller'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {UserModule} from '@/user/user.module'

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
})
export class AppModule {}
