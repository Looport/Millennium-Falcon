import {ModuleMetadata, Provider} from '@nestjs/common'
import {NatsOptions} from '@nestjs/microservices'

export type MicroservicesOptions = NatsOptions

export interface MicroservicesModuleOptionsInterface
  extends Pick<ModuleMetadata, 'imports'> {
  global?: boolean
  useFactory?: (...args: any[]) => MicroservicesOptions
  inject?: any[]
  extraProviders?: Provider[]
}
