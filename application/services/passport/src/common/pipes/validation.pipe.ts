import {
  ValidationError as NestValidationError,
  ValidationPipe as CommonValidationPipe,
} from '@nestjs/common'

import {
  ValidationError,
  ValidationException,
} from '@/common/exeptions/validation.exception'

export const serializeValidationError = (
  error: NestValidationError
): ValidationError => ({
  children: error.children.length
    ? error.children.map((child) => serializeValidationError(child))
    : [],
  field: error.property,
  messages: Object.values(error.constraints),
  value: error.value,
})

export class ValidationPipe extends CommonValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) =>
        new ValidationException(
          errors.map((error) => serializeValidationError(error))
        ),
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    })
  }
}
