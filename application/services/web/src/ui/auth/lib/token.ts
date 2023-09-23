'use client'

export const setToken = (token: string) => {
  document.cookie =
    `accessToken=${token}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const cleanToken = () => {
  document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}