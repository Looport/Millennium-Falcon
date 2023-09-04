import {ValidationPipe as NestValidationPipe} from '@nestjs/common'

import {ValidationException} from '@/common/exeptions/validation.exeption/validation.exception'
import {serializeValidationError} from '@/common/pipes/validation.pipe/serialize-validation-error'

export class ValidationPipe extends NestValidationPipe {
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
