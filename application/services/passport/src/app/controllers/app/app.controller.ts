import {Auth, AuthType} from '@looport/nest-auth'
import {Controller, Get} from '@nestjs/common'

@Controller('app')
export class AppController {
  @Auth(AuthType.None)
  @Get('/status')
  status() {
    return {status: 'ok'}
  }
}
