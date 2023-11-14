'use client'

export const setToken = (token: string) => {
  document.cookie = `accessToken=${token};`
}

export const getToken = () => {
  const cookies = document.cookie.split(';')
  const token = cookies.find((cookie) => cookie.includes('accessToken'))
  if (token) {
    return token.split('=')[1]
  }
  return null
}

export const cleanToken = () => {
  document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}
