import crypto from 'crypto'
import {promisify} from 'util'

import {Injectable} from '@nestjs/common'

const asyncPbkdf2 = promisify(crypto.pbkdf2)

@Injectable()
export class PasswordHashService {
  async createHash(password: string, salt?: string): Promise<string> {
    salt ??= crypto.randomBytes(16).toString('hex')
    const hashedPassword = await asyncPbkdf2(
      password,
      salt,
      10,
      32,
      'sha512'
    ).then((hash) => hash.toString('hex'))

    return [salt, hashedPassword].join('#')
  }

  async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const [salt, actualHash] = hashedPassword.split('#')

    const verifiedPasswordHash = await this.createHash(password, salt)
    const [, verifiedHash] = verifiedPasswordHash.split('#')

    return verifiedHash === actualHash
  }
}
