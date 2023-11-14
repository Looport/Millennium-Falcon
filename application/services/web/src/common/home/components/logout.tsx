'use client'

import {cloneElement, ReactElement} from 'react'

import {cleanToken} from '@/auth/lib/token.client'
import {useRefreshPage} from '@/common/hooks/refresh-page'

export const Logout = ({children}: {children: ReactElement}) => {
  const {refresh} = useRefreshPage()
  const logout = () => {
    cleanToken()

    refresh({redirectTo: '/'})
  }

  const onClick = () => {
    children.props.onClick?.()
    logout()
  }

  return cloneElement(children, {'aria-label': 'Logout', onClick})
}
