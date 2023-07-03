import {Module} from '@nestjs/common'

import {AppController} from '@/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [],
})
export class AppModule {}
