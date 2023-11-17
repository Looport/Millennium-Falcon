'use client'

export const setClientToken = (token: string) => {
  document.cookie = `accessToken=${token};`
}

export const getClientToken = () => {
  const cookies = document.cookie.split(';')
  const token = cookies.find((cookie) => cookie.includes('accessToken'))
  if (token) {
    return token.split('=')[1]
  }
  return null
}

export const cleanClientToken = () => {
  document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}
