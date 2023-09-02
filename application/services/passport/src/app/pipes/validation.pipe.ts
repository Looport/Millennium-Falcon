import {BadRequestException, ValidationError, ValidationPipe as CommonValidationPipe} from "@nestjs/common";

export const serializeValidationError = (error: ValidationError) => {
  return {
    field: error.property,
    value: error.value,
    messages: Object.values(error.constraints),
    children: error.children.length ? error.children.map(child => serializeValidationError(child)) : []
  }
}

export class ValidationPipe extends CommonValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          message: 'Validation',
          errors: errors.map(error => serializeValidationError(error))
        })
      },
      transformOptions: {
        enableImplicitConversion: true,
      },
    });
  }
}