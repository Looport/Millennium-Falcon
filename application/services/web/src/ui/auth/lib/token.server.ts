'use server'

import {cookies} from 'next/headers'

export const getServerToken = () => cookies().get('accessToken')?.value ?? null

export const setServerToken = (accessToken: string) =>
  cookies().set('accessToken', accessToken)

export const cleanServerToken = () => cookies().delete('accessToken')
