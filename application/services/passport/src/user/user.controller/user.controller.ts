import {Controller, Get} from '@nestjs/common'

@Controller('user')
export class UserController {
  @Get('iam')
  iam() {
    return {
      email: 'elliot@e-corp.com',
      id: 1,
    }
  }
}
