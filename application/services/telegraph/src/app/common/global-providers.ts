import {ValidationPipe} from '@looport/nest-common'
import {Provider} from '@nestjs/common'
import {APP_PIPE} from '@nestjs/core'

export const GLOBAL_PROVIDERS: Provider[] = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe(),
  },
]
