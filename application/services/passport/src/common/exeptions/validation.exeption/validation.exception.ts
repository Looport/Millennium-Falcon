import {BadRequestException} from '@nestjs/common'

import {VALIDATION_EXEPTION_MESSAGE} from '@/common/exeptions/validation.exeption/constants'

export interface ValidationError {
  field: string
  value: string
  messages: string[]
  children?: ValidationError[]
}

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super({
      errors: errors.map((error) => ({
        ...error,
        children: error.children ?? [],
      })),
      message: VALIDATION_EXEPTION_MESSAGE,
    })
  }
}
