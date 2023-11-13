import {cookies} from 'next/headers'

export const getServerToken = () => cookies().get('accessToken')?.value ?? null
