import {ModuleMetadata, Provider} from '@nestjs/common'
import {JwtModuleOptions} from '@nestjs/jwt'

export interface AuthOptions {
  jwt: JwtModuleOptions
}

export interface AuthModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  global?: boolean
  useFactory?: (...args: any[]) => AuthOptions
  inject?: any[]
  extraProviders?: Provider[]
}
