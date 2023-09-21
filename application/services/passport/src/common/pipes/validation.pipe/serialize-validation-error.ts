import {ValidationError as NestValidationError} from '@nestjs/common/interfaces/external/validation-error.interface'

import {ValidationError} from '@/common/exeptions/validation.exeption/validation.exception'

export const serializeValidationError = (
  error: NestValidationError
): ValidationError => ({
  children: error.children?.length
    ? error.children.map((child) => serializeValidationError(child))
    : [],
  field: error.property,
  messages: Object.values(error.constraints),
  value: error.value,
})
