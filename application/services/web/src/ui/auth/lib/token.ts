'use client'

export const setToken = (token: string) => {
  document.cookie =
    `accessToken=${token};`
}

export const cleanToken = () => {
  document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}