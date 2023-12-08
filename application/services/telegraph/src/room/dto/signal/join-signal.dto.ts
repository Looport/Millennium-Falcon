import {IsString} from 'class-validator'

import {SignalEnum} from '@/room/dto/signal/enums/signal.enum'

export class JoinSignalDto {
  @IsString()
  type: SignalEnum.join
}
