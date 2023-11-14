'use server'

import {cookies} from 'next/headers'

import {UserResponse} from '@/auth/interfaces/user-response.interface'
import {requestFetchIam} from '@/auth/requests/iam/iam.request'
import {getHeaders} from '@/common/lib/request/headers.server'

export const requestServerIam = async (): Promise<UserResponse | null> => {
  const accessToken = cookies().get('accessToken')?.value
  return accessToken
    ? await requestFetchIam({accessToken, headers: getHeaders()})
    : null
}
