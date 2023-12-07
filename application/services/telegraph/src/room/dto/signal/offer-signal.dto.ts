import {Type} from 'class-transformer'
import {IsNumber, IsString} from 'class-validator'

import {SignalEnum} from '@/room/dto/signal/enums/signal.enum'

export class OfferSignalDataDto {
  @IsString()
  peerId: string

  @IsNumber()
  receiverUserId: number
}

export class OfferSignalDto {
  @IsString()
  type: SignalEnum.offer

  @Type(() => OfferSignalDataDto)
  data: OfferSignalDataDto
}
