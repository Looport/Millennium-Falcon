'use server'

import {UserResponse} from '@/auth/interfaces/user-response.interface'
import {requestIam} from '@/auth/requests/iam.request'
import {getServerToken} from '@/ui/auth/lib/token.server'
import {getServerHeaders} from '@/ui/common/lib/headers.server'

export const requestServerIam = async (): Promise<UserResponse | null> => {
  const accessToken = getServerToken()
  return accessToken
    ? await requestIam(accessToken, {headers: getServerHeaders()})
    : null
}
