import {Provider} from '@nestjs/common'
import {APP_PIPE} from '@nestjs/core'

import {ValidationPipe} from '@/common/pipes/validation.pipe/validation.pipe'

export const GLOBAL_PROVIDERS: Provider[] = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe(),
  },
]
