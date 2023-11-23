// __REPLACE__NEXT_PUBLIC_API_HOST__ -> replaces while starting the application
export const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST ?? '__REPLACE__NEXT_PUBLIC_API_HOST__'

export const getApiUrl = () => `http://${API_HOST}/api`

export const getPassportApiUrl = () => `${getApiUrl()}/passport`

export const getTelegraphApiUrl = () => `${getApiUrl()}/telegraph`
