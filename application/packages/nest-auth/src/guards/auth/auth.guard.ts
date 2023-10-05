import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import {Reflector} from '@nestjs/core'

import {AuthType} from '../../decorators/auth/auth-types.enum'
import {AUTH_TYPE_KEY} from '../../decorators/auth/auth.decorator'
import {AccessTokenGuard} from '../access-token/access-token.guard'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: {canActivate: () => true},
  }

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()]
    ) ?? [AuthenticationGuard.defaultAuthType]
    const guards = authType.map((type) => this.authTypeGuardMap[type]).flat()

    let exception = new UnauthorizedException()

    for (const guard of guards) {
      // eslint-disable-next-line no-await-in-loop
      const canActivate = await Promise.resolve(
        guard.canActivate(context)
        // eslint-disable-next-line no-loop-func
      ).catch((error) => {
        exception = error
      })

      if (canActivate) {
        return true
      }
    }

    throw exception
  }
}
