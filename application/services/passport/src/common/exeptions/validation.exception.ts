import {BadRequestException} from '@nestjs/common'

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
      message: 'Validation',
    })
  }
}
