import {Controller, Get} from '@nestjs/common'

import {AuthType} from '@/authorization/decorators/auth/auth-types.enum'
import {Auth} from '@/authorization/decorators/auth/auth.decorator'

@Controller('app')
export class AppController {
  @Auth(AuthType.None)
  @Get('/status')
  status() {
    return {status: 'ok'}
  }
}
